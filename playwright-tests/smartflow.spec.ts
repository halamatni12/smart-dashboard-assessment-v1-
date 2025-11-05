import { test, expect } from '@playwright/test';

test('Full Smart Dashboard Weather Flow', async ({ page }) => {
  // 1️⃣ Go to login
  await page.goto('http://localhost:4200/login');
  await expect(page.locator('text=Welcome Back')).toBeVisible();

  // 2️⃣ Log in
  await page.fill('input[type="email"]', 'halaalmatni12@gmail.com');
  await page.fill('input[type="password"]', 'hala@865033');
  await page.click('button:has-text("Sign in")');

  // 3️⃣ Wait for the Welcome section
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Welcome back')).toBeVisible();

  // 🚫 Disable any other clickable elements (especially “Smart Product Picks” and collections)
  await page.evaluate(() => {
    document.querySelectorAll('.collection-card, [routerlink], [routerLink]').forEach(el => {
      (el as HTMLElement).style.pointerEvents = 'none';
    });

    const picksBtn = Array.from(document.querySelectorAll('button.choice'))
      .find(btn => btn.textContent?.includes('Smart Product Picks'));
    if (picksBtn) (picksBtn as HTMLElement).style.pointerEvents = 'none';
  });

  // 4️⃣ Small delay for safety (let Angular finish rendering)
  await page.waitForTimeout(1500);

  // 5️⃣ Click the exact “Weather Dashboard” button by its title text
  const weatherBtn = page.locator('button.choice:has-text("Weather Dashboard")');
  await expect(weatherBtn).toBeVisible();
  await weatherBtn.click();

  // 🧭 Make sure URL changed to weather dashboard route
 await expect(page).toHaveURL(/weather\/dashboard/);


  // 6️⃣ Wait for dashboard to fully load
  await page.waitForSelector('.dashboard-container', { timeout: 15000 });
  await expect(page.locator('text=Your Location')).toBeVisible({ timeout: 15000 });

  // 7️⃣ Search for “Canada”
  const searchInput = page.locator('input[placeholder="Search city..."]');
  await searchInput.fill('Canada');
  await page.click('button:has-text("Search")');

  // 8️⃣ Wait and verify the city
  await page.waitForTimeout(3000);
  const cityName = page.locator('.city');
  await expect(cityName).toContainText(/Canada/i);

  // 9️⃣ Verify condition and temperature visible
  await expect(page.locator('.condition')).toBeVisible();
  await expect(page.locator('.temp')).toBeVisible();

  console.log('✅ Weather Dashboard search for Canada successful!');
});
