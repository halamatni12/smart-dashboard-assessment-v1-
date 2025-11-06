const { test, expect } = require('@playwright/test');

// Pause helper (smooth timing)
async function slow(page, ms = 900) {
  await page.waitForTimeout(ms);
}

// Scroll smoothly to bottom of page
async function fullPageScroll(page, delay = 120) {
  let lastPos = 0;
  while (true) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(delay);

    const newPos = await page.evaluate(() => window.scrollY);
    if (newPos === lastPos) break;
    lastPos = newPos;
  }
}

// Scroll smoothly back to top
async function scrollToTopSmooth(page, delay = 120) {
  while (true) {
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(delay);

    const atTop = await page.evaluate(() => window.scrollY === 0);
    if (atTop) break;
  }
}

test('🌤️ Full Smart Dashboard Weather + Products + Checkout Flow (Ultra Smooth)', async ({ page }) => {
  test.setTimeout(1300000);

  page.on('dialog', async dialog => dialog.accept());
  page.on('console', msg => console.log(`[BROWSER]: ${msg.text()}`));

  /* 1) LOGIN --------------------------------------------------------- */
  await page.goto('http://localhost:4200/login');
  await expect(page.locator('text=Welcome Back')).toBeVisible();
  await slow(page);

  await page.fill('input[type="email"]', 'halaalmatni12@gmail.com');
  await slow(page);
  await page.fill('input[type="password"]', 'hala@865033');
  await slow(page);

  await page.click('button:has-text("Sign in")');
  await page.waitForLoadState('networkidle');
  await slow(page, 1200);

  /* 2) WEATHER DASHBOARD -------------------------------------------- */
  await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 20000 });
  await slow(page);

  await page.locator('[data-testid="weather-btn"]').click({ force: true });
  await expect(page).toHaveURL(/weather\/dashboard/);
  await slow(page);

  const searchInput = page.locator('input[placeholder="Search city..."]');
  await searchInput.click();
  await slow(page);
  await searchInput.pressSequentially('Canada', { delay: 200 });
  await slow(page);
  await page.click('button:has-text("Search")');
  await slow(page, 1200);

  //  Scroll FULL weather page then go back up nicely
  await fullPageScroll(page, 140);
  await slow(page, 900);
  await scrollToTopSmooth(page, 140);
  await slow(page, 1200);

  await page.click('i.bi-house-door-fill');
  await expect(page).toHaveURL(/\/welcome/);
  await slow(page, 1000);

  /* 3) PRODUCTS PAGE ------------------------------------------------ */
  await page.locator('[data-testid="products-btn"]').click({ force: true });
  await expect(page).toHaveURL(/\/products/);
  await slow(page, 1000);

  await fullPageScroll(page, 140);
  await scrollToTopSmooth(page, 140);
  await slow(page);

  await page.locator('#all_products').click({ force: true });
  await expect(page).toHaveURL(/\/allproducts/);
  await slow(page, 1200);

  await fullPageScroll(page, 140);
  await slow(page, 600);

  /* 4) PRODUCT DETAILS + SIZE + ADD ------------------------------- */
  const firstCard = page.locator('.card').first();
  await firstCard.click({ force: true });
  await expect(page).toHaveURL(/\/products\/\d+/);
  await slow(page, 1200);

  // 🛒 Smooth scroll product details full page down then up
  await fullPageScroll(page, 140);
  await slow(page, 900);
  await scrollToTopSmooth(page, 140);
  await slow(page, 1000);

  const sizeOptions = page.locator('.size-options .size-btn');
  if (await sizeOptions.count() > 0) {
    await sizeOptions.first().click();
    console.log('👕 Size selected');
    await slow(page, 800);
  } else {
    console.log('ℹ️ Product has no sizes');
  }

  await slow(page);

await page.click('.actions .btn.add');
const toast = page.locator('#toastMessage');
await expect(toast).toBeVisible({ timeout: 8000 });
await expect(toast).toContainText(/Added to Cart/i);
console.log('🛒 Added to Cart confirmed');
await slow(page, 1200);

// Add to Wishlist + verify toast
await page.click('.actions .btn.wish');
await expect(toast).toBeVisible({ timeout: 8000 });
await expect(toast).toContainText(/Added to Wishlist|Added to Cart/i);
console.log('💖 Added to Wishlist confirmed');
await slow(page, 1200);

  /* 5) WISHLIST ------------------------------------------------------ */
  await page.locator('i.bi-heart[routerlink="/wishlist"]').click({ force: true });
  await expect(page).toHaveURL(/\/wishlist/);
  await slow(page, 1200);

  const deleteBtn = page.locator('button.btn-outline-danger').first();
  if (await deleteBtn.isVisible()) {
    await deleteBtn.click();
    await slow(page, 800);

    const modal = page.locator('#deleteModal');
    await expect(modal).toBeVisible({ timeout: 7000 });

    await modal.locator('.btn-danger').click();
    await slow(page, 1200);

    console.log('✅ Wishlist delete confirmed');
  }

  /* 6) CART + CHECKOUT ---------------------------------------------- */
  await page.locator('i.bi-bag[routerlink="/cart"]').click({ force: true });
  await expect(page).toHaveURL(/\/cart/);
  await slow(page, 1200);

  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  if (await firstCheckbox.isVisible()) {
    await firstCheckbox.check();
    await slow(page, 700);
  }

  await page.locator('button:has-text("Proceed to Checkout")').click();
  await expect(page).toHaveURL(/\/checkout/);
  await slow(page, 1500);

  /* 7) CHECKOUT FORM ------------------------------------------------ */
  await page.fill('input[placeholder="Full Name"], input[type="text"]', 'Hala Almatni');
  await slow(page);
  await page.fill('input[type="email"]', 'halaalmatni12@gmail.com');
  await slow(page);
  await page.fill('input[type="tel"]', '70123456');
  await slow(page);
  await page.fill('textarea[rows="2"]', 'Beirut Main Street');
  await slow(page);

  await page.locator('input[value="inside"]').check();
  await page.selectOption('select.form-select', 'cod');
  await slow(page, 1200);

  //  Scroll entire page before placing order
  await fullPageScroll(page, 140);
  await slow(page, 800);

  await page.locator('button.btn-success').click({ force: true });
  await slow(page, 2000);

  await expect(page).toHaveURL(/\/profile/);
  await slow(page, 1500);

});
