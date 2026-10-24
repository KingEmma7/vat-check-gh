import { expect, test } from '@playwright/test';

// Fast navigation exposed a host-hydration replay defect in Next 15's bundled
// renderer. Check errors as well as functionality: React's recovery can hide it.
test('rapid language changes and fresh documents preserve server hydration', async ({
  playwright,
  baseURL,
}, testInfo) => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { viewport, deviceScaleFactor, hasTouch, isMobile, userAgent } = testInfo.project.use;
    const browser = await playwright.chromium.launch(testInfo.project.use.launchOptions);
    const context = await browser.newContext({
      baseURL,
      viewport,
      deviceScaleFactor,
      hasTouch,
      isMobile,
      userAgent,
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      await page.addInitScript(() => {
        let originalMain: Element | null = null;
        const observer = new MutationObserver(() => {
          originalMain ??= document.querySelector('main');
        });
        observer.observe(document, { childList: true, subtree: true });
        Object.defineProperty(window, '__originalMain', { get: () => originalMain });
      });
      await page.goto('/');
      await page.getByRole('combobox').fill('Netflx');
      await page.getByRole('option').filter({ hasText: 'Netflix' }).first().click();
      await page.waitForURL('**/check/netflix/');
      await page.getByRole('button', { name: 'Switch to Twi', exact: true }).click();
      await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
      await page.goto('/calculator/');
      await page.locator('#amount').fill('1000');
      await expect(page.locator('.result-figure')).toContainText('1,200.00');
      expect(
        await page.evaluate(
          () => Reflect.get(window, '__originalMain') === document.querySelector('main'),
        ),
      ).toBe(true);
      await page.goto('/check/canva/');
      await expect(page.getByRole('heading', { name: 'Canva', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Switch to Twi', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'tw');
      expect(
        await page.evaluate(
          () => Reflect.get(window, '__originalMain') === document.querySelector('main'),
        ),
      ).toBe(true);
      expect(errors, `fresh browser context ${attempt + 1}`).toEqual([]);
    } finally {
      await browser.close();
    }
  }
});
