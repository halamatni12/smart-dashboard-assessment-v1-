import { test, expect } from '@playwright/test';

test.describe('Smart Dashboard basic E2E', () => {

  test('should load home page', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveTitle(/Smart/i);
  });

  test('should open products page', async ({ page }) => {
    await page.goto('http://localhost:4200/allproducts');
    await expect(page).toHaveURL(/allproducts/);
  });

  test('should open checkout page', async ({ page }) => {
    await page.goto('http://localhost:4200/checkout');
    await expect(page.locator('form')).toBeVisible();
  });

});
