import { type Page } from '@playwright/test';


export const testValues = {
    firstName: 'Alex',
    lastName: 'Sefu',
    email: 'alex@email.com',
    address: 'Some street 1',
    city: 'New York',
    zipCode: '12345',
    country: 'United States',
    payment: {
        nameOnCard: 'Sefu',
        cardNumber: '1234 4567 1234 5678',
        expiry: '01/30',
        cvv: '123'      
    },
}

export async function addContactInfo(page: Page) {
   await page.getByLabel('First Name').fill(testValues.firstName);
   await page.getByLabel('Last Name').fill(testValues.lastName);
   await page.getByLabel('Email').fill(testValues.email);

}
export async function addShippingAddress(page: Page) {
   await page.getByLabel('Address').fill(testValues.address);
   await page.getByLabel('City').fill(testValues.city);
   await page.getByLabel('ZIP Code').fill(testValues.zipCode);
   await page.getByLabel('Country').fill(testValues.country);

}

export async function addPaymentInfo(page: Page) {
await page.getByLabel('Name on Card').fill(testValues.payment.nameOnCard);
await page.getByLabel('Card Number').fill(testValues.payment.cardNumber);
await page.getByLabel('Expiry (MM/YY)').fill(testValues.payment.expiry);
await page.getByLabel('CVC').fill(testValues.payment.cvv);


}

export async function placeOrder(page: Page) {
    await page.getByRole('button', { name: 'Place Order' }).click();


}