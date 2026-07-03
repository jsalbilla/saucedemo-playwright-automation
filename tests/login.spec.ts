import { test, expect } from '../lib/fixtures/saucedemo.fixture';

test.describe(' Saucedemo - Login Functionality', () => {

  // TC-LOGIN-001 - Verify if the validation will appear for invalid Username
  test('should show validation for invalid username', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
    await loginPage.loginFunctionality('sample_user', 'secret_sauce');
    await expect(loginPage.errorValidationContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
  });

  // TC-LOGIN-002 - Verify if the validation will appear for invalid Password
  test('should show validation for invalid password', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
    await loginPage.loginFunctionality('standard_user', 'secret_flavor');
    await expect(loginPage.errorValidationContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
  });

  // TC-LOGIN-003 - Verify if the validation will appear for invalid Username and Password
  test('should show validation for invalid username and password', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
    await loginPage.loginFunctionality('sample_user', 'secret_flavor');
    await expect(loginPage.errorValidationContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
  });

  // TC-LOGIN-004 - Verify if the validation will appear for locked accounts.
  test('should show validation for locked accounts', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
    await loginPage.loginFunctionality('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorValidationContainer).toHaveText('Epic sadface: Sorry, this user has been locked out.')
  });

  // TC-LOGIN-005 - Verify if the user were able to login using valid Username and Password.
  test('should login successfully', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
    await loginPage.loginFunctionality('standard_user', 'secret_sauce');
    await expect(loginPage.inventoryContainer).toBeVisible()
    await expect(loginPage.inventoryList).toBeVisible()
    await expect(loginPage.inventoryCountChecker).toHaveCount(6)
  });
});