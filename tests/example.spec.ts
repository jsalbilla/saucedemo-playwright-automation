import { test, expect } from '../lib/fixtures/login.fixture';

test.describe('Login Functionality', () => {

  // TC-LOGIN-001
  test('should show validation for invalid username', async ({ page, loginPage }) => {
    await loginPage.loginFunctionality('sample_user', 'secret_sauce');
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC-LOGIN-002
  test('should show validation for invalid password', async ({ page, loginPage }) => {
    await loginPage.loginFunctionality('standard_user', 'secret_flavor');
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC-LOGIN-003
  test('should show validation for invalid username and password', async ({ page, loginPage }) => {
    await loginPage.loginFunctionality('sample_user', 'secret_flavor');
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC-LOGIN-004
  test('should login successfully', async ({ page, loginPage }) => {
    await loginPage.loginFunctionality('standard_user', 'secret_sauce');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

});