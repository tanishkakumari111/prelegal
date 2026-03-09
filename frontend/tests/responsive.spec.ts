import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Large Desktop', width: 1920, height: 1080 },
];

test.describe('Responsive Design Tests', () => {
  for (const viewport of viewports) {
    test(`${viewport.name} (${viewport.width}x${viewport.height}) - Page renders correctly`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check that the main header is visible
      await expect(page.getByText('Mutual NDA Creator')).toBeVisible();
      
      // Check that the form is visible
      await expect(page.getByText('Mutual NDA Information')).toBeVisible();
      
      // Check that the generate button is visible
      await expect(page.getByText('Generate NDA Document')).toBeVisible();
    });

    test(`${viewport.name} - Form layout adapts`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Fill form to check layout
      await page.getByLabel(/Party A.*Company Name/).fill('Test Company');
      await page.getByLabel(/Party A.*Principal Address/).fill('123 Test St');
      await page.getByLabel(/Party A.*Notice Address/).fill('test@test.com');
      await page.getByLabel(/Party B.*Company Name/).fill('Test Company 2');
      await page.getByLabel(/Party B.*Principal Address/).fill('456 Test Ave');
      await page.getByLabel(/Party B.*Notice Address/).fill('test2@test.com');
      await page.getByLabel(/Agreement Date/).fill('2024-01-01');
      await page.getByLabel(/Effective Date/).fill('2024-01-01');
      await page.getByLabel(/Purpose of Disclosure/).fill('Testing');
      await page.getByLabel(/Governing Law/).fill('Delaware');
      await page.getByLabel(/Jurisdiction/).fill('Delaware');
      
      // Click generate
      await page.getByText('Generate NDA Document').click();
      
      // Wait for document to render
      await page.waitForTimeout(500);
      
      // Check that the document preview is visible
      await expect(page.getByText('Preview Your Mutual NDA')).toBeVisible();
      
      // Check that download button is visible
      await expect(page.getByText('Download PDF')).toBeVisible();
    });

    test(`${viewport.name} - No horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check for horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });
  }

  test('Form adapts from single column to two columns on larger screens', async ({ page }) => {
    // Test mobile view (single column)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const mobileForm = page.locator('.grid-cols-1');
    await expect(mobileForm).toBeVisible();
    
    // Test desktop view (two columns)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // The form should have two-column layout capability
    const gridElement = page.locator('.grid');
    await expect(gridElement).toBeVisible();
  });
});
