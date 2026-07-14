import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';
import { AddToCartPage } from '../pages/addToCart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { FilterPage } from '../pages/filter.page';

interface MyPages {
    loginPage: LoginPage;
    addToCart: AddToCartPage;
    checkoutReadyCart: AddToCartPage
    checkoutPage: CheckoutPage
    filterPage: FilterPage
}

export const test = base.extend<MyPages>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await use(loginPage);
    },

    addToCart: async ({ page }, use) => {
        const addToCart = new AddToCartPage(page);
        await use(addToCart);
    },

    checkoutReadyCart: async ({ loginPage, addToCart, page }, use) => {
        await loginPage.loginFunctionality('standard_user', 'secret_sauce');
        await expect(loginPage.inventoryCountChecker).toHaveCount(6);
        await addToCart.backpackAddButton.click();
        await addToCart.bikelightAddButton.click();
        await expect(addToCart.shoppingCartBadge).toHaveText('2');
        await addToCart.goToCart();
        await expect(page).toHaveURL(/cart.html/);
        await use(addToCart);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },

    filterPage: async ({ loginPage, page }, use) => {
        const filterPage = new FilterPage(page)
        await loginPage.loginFunctionality('standard_user', 'secret_sauce');
        await use(filterPage)
    }



});

export { expect };
