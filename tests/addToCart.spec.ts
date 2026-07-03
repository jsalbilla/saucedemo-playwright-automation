import { test, expect } from '../lib/fixtures/saucedemo.fixture';

test.describe('Add to Cart Functionality', () => {

    test('Check Items Container and Add To Cart Functionality', async ({ loginPage, addToCart }) => {
        await loginPage.loginFunctionality('standard_user', 'secret_sauce')
        await expect(loginPage.inventoryContainer).toBeVisible()
        await expect(loginPage.inventoryList).toBeVisible()
        await expect(loginPage.inventoryCountChecker).toHaveCount(6)

        await test.step('Add to Cart Sauce Labs Backpack', async () => {
            await expect(addToCart.sauceLabBackPackMainHeading).toBeVisible()
            await expect(addToCart.sauceLabBackPackDescription).toBeVisible()
            await expect(addToCart.sauceLabBackPackPrice).toHaveText('$29.99')
            await addToCart.backpackAddButton.click()

            //Remove button should become visible. 
            await expect(addToCart.backPackRemoveButton).toBeVisible()
        });

        await test.step('Add to Cart Sauce Labs Bike Light', async () => {
            await expect(addToCart.sauceLabBikeLightMainHeading).toBeVisible()
            await expect(addToCart.sauceLabBikeLightDescription).toBeVisible()
            await expect(addToCart.sauceLabBikeLightPrice).toHaveText('$9.99')
            await addToCart.bikelightAddButton.click()

            //Remove button should become visible. 
            await expect(addToCart.bikelightRemoveButton).toBeVisible()
        });

        await test.step('Verify the cart badge reflects the selected items', async () => {
            await expect(addToCart.shoppingCartBadge).toBeVisible()
            await expect(addToCart.shoppingCartBadge).toHaveText('2')
        })
    });
});
