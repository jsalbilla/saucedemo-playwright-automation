import { type Locator, type Page } from '@playwright/test';
import { read } from 'node:fs';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorValidationContainer: Locator

    // Landing Page Inventory Variables
    readonly inventoryContainer: Locator
    readonly inventoryList: Locator
    readonly inventoryCountChecker: Locator
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: "Login" })
        this.errorValidationContainer = page.getByTestId('error')

        // Landing Page Inventory Locators
        this.inventoryContainer = page.getByTestId('inventory-container')
        this.inventoryList = page.getByTestId('inventory-list')
        this.inventoryCountChecker = page.getByTestId('inventory-item')
    }

    async loginFunctionality(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}