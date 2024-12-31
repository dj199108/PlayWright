import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://advantageonlineshopping.com/#/');
  await page.locator('select[name="categoryListboxContactUs"]').selectOption('object:60');
  await page.locator('select[name="productListboxContactUs"]').selectOption('object:126');
  await page.locator('input[name="emailContactUs"]').click();
  await page.locator('input[name="emailContactUs"]').fill('j@gamil.com');
  await page.locator('textarea[name="subjectTextareaContactUs"]').click();
  await page.locator('textarea[name="subjectTextareaContactUs"]').fill('provemos el limpiar\n\nj@gamil.com');
  await page.getByRole('button', { name: 'SEND' }).click();
});