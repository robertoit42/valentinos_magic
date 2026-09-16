import { test, expect } from '@playwright/test';
import * as Cart from '../Pages/Cart';

test('Validar subtotal en carrito', async ({ page }) => {
  await page.goto('https://valentinos-magic-beans.click/products');
  await Cart.assertProduct(page, 'Producto X');
  const subtotal = await Cart.getSubTotal(page);
  expect(subtotal).toBeGreaterThan(0);
});
