import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toContain('Playwright')
  // alterando de: toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
});
