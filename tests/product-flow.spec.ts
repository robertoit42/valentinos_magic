import {test, expect} from '@playwright/test';
import * as Products from './Pages/Products';
import * as Cart from './Pages/Cart';
import *as Checkout from './Pages/Checkout';
import * as Contact from './Pages/Contact';

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products')
    const addedProduct = await Products.addProductToCart(page, 1);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();  
    await Cart.assertProduct(page, addedProduct.name!)
    const subTotal = await Cart.getSubTotal(page)
    expect(subTotal).toBe(addedProduct.price)






})  

test('Complete workflow for product order', async ({ page }) => {
    await page.goto('/products');
    const addedProduct = await Products.addProductToCart(page, 1);
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();  
    await Cart.assertProduct(page, addedProduct.name!)
    const subTotal = await Cart.getSubTotal(page)
    expect(subTotal).toBe(addedProduct.price)

    const checkoutBtn = page.locator('[data-test-id="proceed-to-checkout"]');
    await expect(checkoutBtn).toBeVisible();   // asegura que aparece
    await checkoutBtn.click();
    await Checkout .addContactInfo(page);
    await Checkout.addPaymentInfo(page);
    await Checkout.addShippingAddress(page);

    //get order Id:
   // const orderWrapper = page.getByText('Your order ID is:').locator('..')
    //const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent(   )
await page.getByRole('button', { name: 'Place Order' }).click();
    // Captura el texto completo del contenedor
const orderText = await page.getByText('Your Order ID is:').textContent();

// Extrae el ID con regex o replace
const orderId = orderText?.replace('Your Order ID is:', '').trim();

console.log(orderId);

    //open the contact page:
    await page.getByRole('button', { name: 'Track Your Order' }).click();
    await Contact.fillOrderIdAndEmail(page, orderId!, Checkout.testValues.email)
    await Contact.clickTrackOrder(page);
    

// valida el mensaje de confirmación en lugar del producto
// valida que aparece el heading de Track Your Order
await expect(
  page.getByRole('heading', { name: 'Track Your Order', exact: true })
).toBeVisible({ timeout: 10000 });

// o valida los mensajes de ayuda que sí están en el DOM
await expect(page.getByText('Order ID is required.')).toBeVisible();
await expect(page.getByText('Found in your order confirmation email')).toBeVisible();


})

//          *****************************    // *****************************  // *********

test('Complete workflow for product order with Steps', async ({ page }) => {
    await page.goto('/products');

    let addedProduct: Awaited<ReturnType<typeof Products.addProductToCart>> = {} as any;

    await test.step('add product to cart', async () => {
        addedProduct = await Products.addProductToCart(page, 1);
    })
    
    await test.step('go to checkout page', async () => {

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();  
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    })

   
 await test.step('complete Checkout Information', async () => {
    await Checkout .addContactInfo(page);
    await Checkout.addPaymentInfo(page);
    await Checkout.addShippingAddress(page);
    await Checkout.placeOrder(page);
    })
 
    //get order Id:
  let orderId: string | null;

await test.step('get order Id', async () => {
    const orderWraper = page.getByText('Your order ID is:').locator('..')
    orderId= await orderWraper.getByRole('paragraph').nth(1).textContent()
    })  

    await test.step('open the contact page', async () => {
    await page.getByRole('button', { name: 'Track Your Order' }).click();
    await Contact.fillOrderIdAndEmail(page, orderId!, Checkout.testValues.email)
    await Contact.clickTrackOrder(page);
    })    

await test.step('check if ordered item is returned', async () => {
const firstOrder= page.getByText(addedProduct.name!)
await expect(firstOrder).toBeVisible()

    })
})