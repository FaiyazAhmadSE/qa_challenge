import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.imdb.com/');
  await page.getByPlaceholder('Search IMDb').fill('nikolas cage');
  await page.getByLabel('Submit Search').click();
  await page.getByTestId('find-results-section-name').getByRole('link', { name: 'Nicolas Cage' }).click();
  await page.getByTestId('accordion-item-actor-upcoming-projects').click();
  await page.getByRole('link', { name: 'The Gunslingers' }).click();
});