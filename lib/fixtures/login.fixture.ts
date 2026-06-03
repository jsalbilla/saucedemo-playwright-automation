import { test as BaseTest} from '@playwright/test';
import { LoginPage } from '../pages/login.pages';

interface loginPageFixture {
    loginPage: LoginPage;
}

export const test = BaseTest.extend<loginPageFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';