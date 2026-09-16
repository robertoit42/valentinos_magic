import { Page,expect } from '@playwright/test';

export async function assertProduct(page: Page, heading: string) {
    const firstProductHeading = page.getByRole('heading', { 
        name: heading 
    })
    await expect(firstProductHeading).toBeVisible()
}

export async function getSubTotal(page: Page) {
  // Variante 1: buscar por texto exacto y subir un nivel
  const subTotalWrapper = page.getByText(/Subtotal/i).locator('..').locator('.font-semibold');
  await expect(subTotalWrapper).toBeVisible(); // asegura que aparece
  const subTotal = await subTotalWrapper.textContent();
  return Number(subTotal?.substring(1));
}
