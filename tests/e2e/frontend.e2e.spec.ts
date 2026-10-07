import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

test('homepage presents EPUBTRANS and the quote destination', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/EPUBTRANS/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your content.')
  await expect(page.getByRole('link', { name: 'Get a Quote' }).first()).toHaveAttribute(
    'href',
    '/get-a-quote',
  )
  await mkdir('artifacts/v2/screens', { recursive: true })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.screenshot({ path: 'artifacts/v2/screens/homepage-desktop.png' })
})

test('mobile insight filters and repeated search parameters render safely', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/insights?q=unmatched-editorial-fixture')
  await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'No matching perspectives.' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  await page.goto('/insights?q=first&q=second')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The next perspective.')
})
