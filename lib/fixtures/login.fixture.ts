import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';
import { AddToCartPage } from '../pages/addToCart.page';

interface MyPages {
    loginPage: LoginPage;
    addToCart: AddToCartPage;
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
    }
});

export { expect };
