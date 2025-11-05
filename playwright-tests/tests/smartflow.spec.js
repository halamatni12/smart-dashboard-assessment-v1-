import { test, expect } from '@playwright/test';

test('Full Smart Dashboard Flow', async ({ page }) => {

  // 1️⃣ افتح صفحة تسجيل الدخول
  await page.goto('http://localhost:4200/login');
  await expect(page.locator('text=Welcome Back')).toBeVisible();

  // 2️⃣ سجل الدخول
  await page.fill('input[type="email"]', 'halaalmatni12@gmail.com');
  await page.fill('input[type="password"]', 'hala@865033');
  await page.click('button:has-text("Sign in")');
  await page.waitForURL('**/welcome');

  // 3️⃣ من صفحة welcome كبس على Smart Product Picks
  await expect(page.locator('text=Smart Product Picks')).toBeVisible();
  await page.click('text=Smart Product Picks');
  await page.waitForURL('**/products');

  // 4️⃣ من صفحة All Products، افتح أول منتج
  const firstProduct = page.locator('.card').first();
  await firstProduct.click();
  await page.waitForURL(/products\/\d+/);

  // 5️⃣ اختار Size إذا موجود
  const sizeBtn = page.locator('button:has-text("S")');
  if (await sizeBtn.isVisible()) {
    await sizeBtn.click();
  }

  // 6️⃣ أضف المنتج إلى Wishlist و Cart
  await page.click('button:has-text("Wishlist")');
  await page.click('button:has-text("Add to Cart")');
  await page.waitForTimeout(1000);

  // 7️⃣ افتح صفحة Wishlist
  await page.click('i.bi-heart');
  await page.waitForURL('**/wishlist');
  await expect(page.locator('text=My Wishlist')).toBeVisible();

  // 8️⃣ انقل المنتج من Wishlist إلى Cart
  const moveBtn = page.locator('button:has-text("Move to Cart")');
  if (await moveBtn.isVisible()) {
    await moveBtn.click();
  }
  await page.waitForTimeout(1000);

  // 9️⃣ افتح صفحة Cart
  await page.click('i.bi-bag');
  await page.waitForURL('**/cart');
  await expect(page.locator('text=Shopping Cart')).toBeVisible();

  // ✅ 10️⃣ اختار منتج وحده و Proceed to Checkout
  await page.locator('input[type="checkbox"]').first().check();
  await page.click('button:has-text("Proceed to Checkout")');
  await page.waitForURL('**/checkout');

  // 11️⃣ عبّي المعلومات بالفورم
  await page.fill('input[placeholder="Full Name"]', 'Hala Almatni');
  await page.fill('input[type="tel"]', '70123456');
  await page.fill('textarea', 'Tripoli Main Road');
  await page.click('input[value="inside"]');

  // 12️⃣ Confirm Order
  await page.click('button:has-text("Confirm & Place Order")');
  await page.waitForTimeout(1500);

  // 13️⃣ تأكّد إنو الطلب تأكّد
  await expect(page.locator('text=Order Confirmed')).toBeVisible();
});
