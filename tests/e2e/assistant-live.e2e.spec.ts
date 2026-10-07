import { test, expect } from '@playwright/test'

test('live Gemini replies retain conversation context', async ({ page }) => {
  test.skip(process.env.LIVE_ASSISTANT_TESTS !== 'true', 'Opt in to live provider usage')
  await page.goto('/resources')
  await page.getByRole('button', { name: 'Open EPUBTRANS assistant' }).click()
  const dialog = page.getByRole('dialog')
  const input = dialog.getByLabel('Your message', { exact: true })
  await input.fill(
    'I need to translate a 12-page English brochure into French. What should I prepare?',
  )
  const firstResponse = page.waitForResponse('**/api/assistant')
  await dialog.getByRole('button', { name: 'Send message' }).click()
  expect((await firstResponse).status()).toBe(200)
  await expect(dialog.getByRole('button', { name: 'Send message' })).toBeVisible({ timeout: 50000 })
  await expect(dialog.getByRole('log')).toContainText(/French/i)
  const firstReply = await dialog.locator('.et-assistant-message-assistant').last().innerText()
  expect(firstReply.length).toBeGreaterThan(40)
  await input.fill('Which target language did I mention? Answer in one sentence.')
  const followUp = page.waitForRequest('**/api/assistant')
  await dialog.getByRole('button', { name: 'Send message' }).click()
  expect((await followUp).postDataJSON().messages).toHaveLength(3)
  await expect(dialog.getByRole('button', { name: 'Send message' })).toBeVisible({ timeout: 50000 })
  await expect(dialog.locator('.et-assistant-message-assistant').last()).toContainText(/French/i)
  await expect(dialog.getByRole('alert')).toHaveCount(0)
  await dialog.screenshot({ path: 'artifacts/v2/screens/assistant-live-conversation.png' })
})
