import {Page} from '@playwright/test';

export async function fillOrderIdAndEmail(page: Page, orderId: string, email: string) {
  await page.getByLabel('Order ID').fill(orderId);
  await page.getByLabel('Email Address').fill(email);
}

export async function clickTrackOrder(page: Page) {
  await page.getByRole('button', { name: 'Track Order' }).click();
}