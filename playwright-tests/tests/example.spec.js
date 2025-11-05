const { test, expect } = require('@playwright/test');

test('Smart Dashboard opens home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Smart/i);
});
