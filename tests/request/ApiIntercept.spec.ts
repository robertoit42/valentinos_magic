import {test, expect} from '@playwright/test';



test('print api calls to products ', async ({ page }) => {
    // print all requests
    page.on('request', request => console.log(request.method(), request.url()));

    await page.goto('/products');
    
})

test('print api calls to products - complete', async ({ page }) => {
    // print all requests
    page.on('request', request => console.log(request.method(), request.url()));

    await page.goto('/products');
    await page.waitForLoadState('networkidle');
});



test('intercept api call to products', async ({ page }) => {
    
    const someProducts = {
        
    "success": true,
    "source": "dynamodb",
    "data": [ {
            "name": "Brazilian Santos",
            "price": 22.99,
            "id": "504"
},
{
         "name": "Guatemalan Volcano",
         "price": 26.99,
         "id": "502",
        }
        ]
}
await page.route('https://api.valentinos-magic-beans.click/products', (route) => {
    route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(someProducts),
    })

})
    await page.goto('/products');
    // this will allow intercepting fetch request
    await page.waitForLoadState('networkidle')

    await page.locator('[data-test-id="product-card-add-to-cart-button-504"]').click()
    await page.locator('[data-test-id="product-card-add-to-cart-button"]').getByRole('button').click();

    //assert productname
    const firstProductHeading = page.getByRole('heading', {
         name: someProducts.data[0].name,
    })
    await expect(firstProductHeading).toBeVisible()
})

  // 🔹 Assertions para todos los productos mockeados,dcspues de 
  // await page.goto('/products');
 // await page.waitForLoadState('networkidle');
       // Assertions para todos los productos mockeados, despues de arriba
 /* for (const product of someProducts.data) {
    const productHeading = page.getByRole('heading', { name: product.name });
    await expect(productHeading).toBeVisible();
 

    import { test, expect } from '@playwright/test';

test('intercept api call to products and validate all', async ({ page }) => {
  const someProducts = {
    success: true,
    source: 'dynamodb',
    data: [
      { name: 'Brazilian Santos', price: 22.99, id: '504' },
      { name: 'Guatemalan Volcano', price: 26.99, id: '502' },
    ],
  };

  /*
  // Interceptar la API y devolver productos mockeados
  await page.route('https://api.valentinos-magic-beans.click/products', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(someProducts),
    })
  );

  await page.goto('/products');
  await page.waitForLoadState('networkidle');

  // 🔹 Assertions para todos los productos mockeados
  for (const product of someProducts.data) {
    // Validar nombre
    const productHeading = page.getByRole('heading', { name: product.name });
    await expect(productHeading).toBeVisible();

    // Validar precio (ajusta selector según tu DOM real)
    const productPrice = page.locator(`[data-test-id="product-price-${product.id}"]`);
    await expect(productPrice).toHaveText(`$${product.price}`);
  }
});

*/