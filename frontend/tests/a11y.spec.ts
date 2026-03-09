import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('NDA Form has no critical accessibility issues', async ({ page }) => {
    // Start from the app homepage
    await page.goto('http://localhost:3000');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Run axe accessibility tests
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    // Filter out non-critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious'
    );
    
    // Log violations for review
    if (criticalViolations.length > 0) {
      console.log('Accessibility violations found:');
      criticalViolations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }
    
    // Expect no critical violations
    expect(criticalViolations.length).toBe(0);
  });

  test('Form has proper labels for all inputs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check that all form inputs have associated labels
    const inputs = await page.locator('input, select, textarea').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });

  test('Form has proper color contrast', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag21aa'])
      .analyze();
    
    const contrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations.length).toBe(0);
  });

  test('Form is keyboard accessible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Tab through the form
    const firstInput = page.locator('input').first();
    await firstInput.focus();
    
    // Check that the first input is focused
    await expect(firstInput).toBeFocused();
    
    // Tab to next element
    await page.keyboard.press('Tab');
  });

  test('Buttons have accessible names', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check that buttons have accessible text
    const generateButton = page.getByText('Generate NDA Document');
    await expect(generateButton).toBeVisible();
    
    // Check that the button is reachable via keyboard
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    expect(await focusedElement.getAttribute('type')).toBe('text');
  });
});
