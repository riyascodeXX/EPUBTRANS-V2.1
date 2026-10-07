import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'
import { randomUUID } from 'node:crypto'

test.describe('Admin Panel', () => {
  test.setTimeout(90000)
  let page: Page

  test.beforeAll(async ({ browser, baseURL }) => {
    await seedTestUser()

    const context = await browser.newContext({ baseURL })
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await page?.context().close()
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin$/)
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to list view', async () => {
    await page.goto('/admin/collections/users')
    await expect(page).toHaveURL(/\/admin\/collections\/users$/)
    const listViewArtifact = page.locator('h1', { hasText: 'Users' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto('/admin/collections/pages/create')
    await expect(page).toHaveURL(/\/admin\/collections\/pages\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="title"]')
    await expect(editViewArtifact).toBeVisible()
  })
  test('editorial blocks appear publicly only after publishing', async ({ request }) => {
    const slug = `qa-editorial-${randomUUID()}`
    const created = await page.request.post('/api/pages', {
      data: {
        title: 'QA editorial fixture',
        slug,
        hero: { type: 'none' },
        layout: [
          {
            blockType: 'statement',
            title: 'A published editorial statement',
            description: 'Temporary automated CMS validation fixture.',
          },
        ],
        _status: 'draft',
      },
    })
    expect(created.status()).toBe(201)
    const { doc } = await created.json()
    try {
      expect((await request.get(`/${slug}`)).status()).toBe(404)
      const publish = await page.request.patch(`/api/pages/${doc.id}`, {
        data: { _status: 'published' },
      })
      expect(publish.status()).toBe(200)
      const publicPage = await request.get(`/${slug}`)
      expect(publicPage.status()).toBe(200)
      expect(await publicPage.text()).toContain('A published editorial statement')
    } finally {
      expect((await page.request.delete(`/api/pages/${doc.id}`)).status()).toBe(200)
    }
  })
})
