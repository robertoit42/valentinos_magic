import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('store auth state', async ({ page }) => {
  // Ir al login de Valentino’s Magic Beans
  await page.goto('https://valentinos-magic-beans.click/login');

  // Completar usuario y password válidos
  await page.fill('#email', 'robertoit2022@gmail.com');
  await page.fill('#password', 'Holamty26');
  await page.click('button[type="submit"]');

  // Guardar cookies y localStorage en user.json
  await page.context().storageState({ path: authFile });
});
