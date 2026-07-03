import { test, expect } from '../lib/fixtures/login.fixture';

test.describe('Add to Cart Functionality', () => {
    test('Add to Cart Sauce Labs Backpack', async ({ page, loginPage, addToCart }) => {
        await loginPage.loginFunctionality('standard_user', 'secret_sauce');
        await expect(addToCart.sauceLabBackPackMainHeading).toBeVisible()
        await expect(addToCart.sauceLabBackPackDescription).toBeVisible()
        await expect(addToCart.sauceLabBackPackPrice).toContainText('$29.99')
        await addToCart.sauceLabBackPackAddToCart.click()

        await test.step('Add to Cart Sauce Labs Bike Light', async ()=> {
        await expect(addToCart.sauceLabBikeLightMainHeading).toBeVisible()
        await expect(addToCart.sauceLabBikeLightDescription).toBeVisible()
        await expect(addToCart.sauceLabBikeLightPrice).toBeVisible()
        await addToCart.sauceLabBikeLightAddToCartButton.click()
    })
    });
});
