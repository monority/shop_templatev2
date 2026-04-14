import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/HORLOGÉ/i);
  });

  test('hero section displays', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Shop');
    await expect(page).toHaveURL(/shop/);
  });

  test('marquee scrolls', async ({ page }) => {
    await page.goto('/');
    const marquee = page.locator('text=NEW ARRIVALS').first();
    await expect(marquee).toBeVisible();
  });
});

test.describe('Shop', () => {
  test('filters work', async ({ page }) => {
    await page.goto('/shop');
    await page.click('text=Men');
    await expect(page).toHaveURL(/men/);
  });
});