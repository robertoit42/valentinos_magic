import { type Page} from '@playwright/test';

 export async function addProductToCart(page: Page, index: number){

    const ProductWrapper = page.locator('.p-6').nth(index)
    const productName = await ProductWrapper.getByRole('heading').first().textContent()
    const productPrice = await ProductWrapper.locator('.font-bold').textContent()
    const firstButton = await ProductWrapper.getByRole('button', {  name: 'Add to Cart' })
   
    await firstButton.click()

    return {
        name: productName,
        price: Number(productPrice?.substring(1))
    }
}       