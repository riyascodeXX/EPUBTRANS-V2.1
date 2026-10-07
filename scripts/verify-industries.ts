import 'dotenv/config'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const base = process.env.INDUSTRIES_TEST_URL || 'http://localhost:3001'
const payload = await getPayload({ config })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
let draftID: number | undefined
let testUserID: number | undefined
try {
  const industries = await payload.find({ collection: 'industries', pagination: false, depth: 0 })
  assert.equal(industries.totalDocs, 11)
  assert.equal(industries.docs.filter((doc) => doc.category === 'core').length, 5)
  assert.equal(industries.docs.filter((doc) => doc.category === 'business-professional').length, 6)
  assert(
    industries.docs.every(
      (doc) =>
        doc.status === 'published' &&
        doc.overview &&
        doc.challenges?.length &&
        doc.solutions?.length &&
        doc.services?.length &&
        doc.workflow?.length &&
        doc.faqs?.length,
    ),
  )
  const collection = payload.config.collections.find((entry) => entry.slug === 'industries')
  assert.equal(collection?.admin.group, 'Content')
  const page = await browser.newPage()
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const route = async (path: string, status = 200) => {
    const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    assert.equal(response?.status(), status, path)
    console.log(`${status} ${path}`)
  }
  await route('/admin')
  const email = `industries-check-${Date.now()}@example.invalid`
  const password = randomBytes(24).toString('hex')
  const testUser = await payload.create({
    collection: 'users',
    data: { email, password, name: 'Temporary Industries verification' },
  })
  testUserID = testUser.id
  assert.equal(
    (await page.request.post(`${base}/api/users/login`, { data: { email, password } })).status(),
    200,
  )
  await route('/admin/collections/industries')
  assert.equal(await page.locator('h1').innerText(), 'Industries')
  const permissions = await page.request.get(`${base}/api/access`)
  assert.equal((await permissions.json()).collections?.industries.read, true)
  // Payload renders the active collection as a div rather than a redundant link.
  for (const slug of ['industries', 'services', 'solutions']) {
    assert(await page.locator(`nav #nav-${slug}`).isVisible(), `Admin navigation: ${slug}`)
  }
  await page.request.post(`${base}/api/users/logout`)
  await payload.delete({ collection: 'users', id: testUser.id })
  testUserID = undefined
  await route('/industries')
  assert.equal(await page.locator('main article').count(), 11)
  for (const industry of industries.docs) {
    await route(`/industries/${industry.slug}`)
    assert.equal(await page.locator('h1').innerText(), industry.hero?.headline || industry.title)
    assert.equal(await page.title(), `${industry.seo?.metaTitle || industry.title} | EPUBTRANS`)
    assert.equal(
      await page.locator('meta[name="description"]').getAttribute('content'),
      industry.seo?.metaDescription || industry.shortDescription,
    )
    assert.equal(await page.locator('main details').count(), industry.faqs?.length)
    await page.locator('main summary').first().focus()
    await page.keyboard.press('Enter')
    assert(
      await page
        .locator('main details')
        .first()
        .evaluate((element) => element.hasAttribute('open')),
    )
    const links = await page
      .locator('main a[href^="/services/"]')
      .evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))
    for (const link of links)
      assert.equal((await page.request.get(`${base}${link}`)).status(), 200, link || '')
  }
  await route('/industries/does-not-exist', 404)
  const draft = await payload.create({
    collection: 'industries',
    data: {
      title: 'Temporary visibility test',
      slug: `industries-draft-check-${Date.now()}`,
      category: 'core',
      status: 'draft',
    },
  })
  draftID = draft.id
  await route(`/industries/${draft.slug}`, 404)
  const anonymous = await page.request.get(
    `${base}/api/industries?where[slug][equals]=${draft.slug}`,
  )
  assert.equal((await anonymous.json()).totalDocs, 0)
  assert.equal((await page.request.get(`${base}/api/industries/${draft.id}`)).status(), 404)
  await route('/industries')
  assert.equal(await page.locator('main article').count(), 11)
  await payload.delete({ collection: 'industries', id: draft.id })
  draftID = undefined

  const { docs: solutions } = await payload.find({
    collection: 'solutions',
    where: { status: { equals: 'published' } },
    pagination: false,
  })
  for (const path of [
    '/services',
    '/solutions',
    ...solutions.map((solution) => `/solutions/${solution.slug}`),
  ])
    await route(path)
  await mkdir('artifacts/industries', { recursive: true })
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1600]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/industries', '/industries/publishing']) {
      await route(path)
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `Horizontal overflow: ${path} at ${width}`,
      )
      const columns = await page
        .locator('main article')
        .first()
        .evaluate(
          (element) =>
            getComputedStyle(element.parentElement!).gridTemplateColumns.split(' ').length,
        )
      assert.equal(columns, width < 768 ? 1 : width < 1280 ? 2 : 3)
      if ([390, 1440].includes(width))
        await page.screenshot({
          path: `artifacts/industries/${path.endsWith('publishing') ? 'publishing' : 'landing'}-${width}.png`,
          fullPage: true,
        })
    }
  }
  assert.deepEqual(errors, [], 'Browser runtime errors')
  console.log(
    'PASS: 11 records, admin registration, routes, SEO, service links, draft protection, keyboard FAQ, eight viewport widths and regression routes.',
  )
} finally {
  if (testUserID !== undefined) await payload.delete({ collection: 'users', id: testUserID })
  if (draftID !== undefined) await payload.delete({ collection: 'industries', id: draftID })
  await browser.close()
  await payload.destroy()
}

process.exit(0)
