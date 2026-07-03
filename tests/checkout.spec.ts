import { test, expect } from "../lib/fixtures/saucedemo.fixture";

test.describe('Checkout Page Functionality', () => {
    test('should check if the correct items were added to the cart', async ({ checkoutReadyCart }) => {
        // Check Sauce Labs Backpack if added to cart. 
        await expect(checkoutReadyCart.sauceLabBackPackMainHeading).toHaveText('Sauce Labs Backpack')
        await expect(checkoutReadyCart.sauceLabBackPackPrice).toHaveText('$29.99')
        // Check Sauce Labs Bike Light if added to cart. 
        await expect(checkoutReadyCart.sauceLabBikeLightMainHeading).toHaveText('Sauce Labs Bike Light')
        await expect(checkoutReadyCart.sauceLabBikeLightPrice).toHaveText('$9.99')
    })
    test('should show validation when first name is missing', async ({ checkoutReadyCart: _checkoutReadyCart, checkoutPage }) => {
        await checkoutPage.navigateToCheckoutPage();
        await checkoutPage.checkoutLastName.fill('Thompson');
        await checkoutPage.checkoutPostalCode.fill('11223');
        await checkoutPage.checkoutContinueButton.click();
        await expect(checkoutPage.checkoutErrorMessage).toHaveText('Error: First Name is required');
    });

    test('should show validation when last name is missing', async ({ checkoutReadyCart: _checkoutReadyCart, checkoutPage }) => {
        await checkoutPage.navigateToCheckoutPage();
        await checkoutPage.checkoutFirstName.fill('Klay');
        await checkoutPage.checkoutPostalCode.fill('11223');
        await checkoutPage.checkoutContinueButton.click();
        await expect(checkoutPage.checkoutErrorMessage).toHaveText('Error: Last Name is required');
    });

    test('should show validation when postal code is missing', async ({ checkoutReadyCart: _checkoutReadyCart, checkoutPage }) => {
        await checkoutPage.navigateToCheckoutPage();
        await checkoutPage.checkoutFirstName.fill('Klay');
        await checkoutPage.checkoutLastName.fill('Thompson');
        await checkoutPage.checkoutContinueButton.click();
        await expect(checkoutPage.checkoutErrorMessage).toHaveText('Error: Postal Code is required');
    });

    test('should have valid information and continue to complete the checkout', async ({ checkoutReadyCart: _checkoutReadyCart, checkoutPage }) => {
        await checkoutPage.navigateToCheckoutPage();
        await checkoutPage.checkoutFirstName.fill('Klay');
        await checkoutPage.checkoutLastName.fill('Thompson');
        await checkoutPage.checkoutPostalCode.fill('11223');
        await checkoutPage.checkoutContinueButton.click();

        //Complete the Checkout, check payment information labels.
        await expect(checkoutPage.paymentInformationLabel).toBeVisible()
        await expect(checkoutPage.shippingInformationLabel).toBeVisible()
        await expect(checkoutPage.priceTotalLabel).toBeVisible()

        //Click Finish Button
        await checkoutPage.finishCheckout()

        await test.step('Verify Checkout: Compelete! page Visibility', async () => {
            await expect(checkoutPage.orderCompleteHeading).toBeVisible()
            await checkoutPage.backToHome()
        })
    });
})