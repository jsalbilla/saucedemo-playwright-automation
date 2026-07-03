import { type Page, type Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page
    readonly checkoutButton: Locator

    // Your Information Variables
    readonly checkoutFirstName: Locator
    readonly checkoutLastName: Locator
    readonly checkoutPostalCode: Locator
    readonly checkoutContinueButton: Locator

    // Validation Variable
    readonly checkoutErrorMessage: Locator

    // Payment Information Labels Variable
    readonly paymentInformationLabel: Locator
    readonly shippingInformationLabel: Locator
    readonly priceTotalLabel: Locator

    // Finish Button Variable
    readonly finishButton: Locator

    // Complete Header and Back Home Variables
    readonly orderCompleteHeading: Locator
    readonly backToHomeButton: Locator


    constructor(page: Page) {
        this.page = page
        this.checkoutButton = page.getByTestId('checkout')

        //Your Information Locators
        this.checkoutFirstName = page.getByTestId('firstName')
        this.checkoutLastName = page.getByTestId('lastName')
        this.checkoutPostalCode = page.getByTestId('postalCode')
        this.checkoutContinueButton = page.getByTestId('continue')

        // Validation Locator
        this.checkoutErrorMessage = page.getByTestId('error');

        // Payment Information Labels Locator
        this.paymentInformationLabel = page.getByTestId('payment-info-label')
        this.shippingInformationLabel = page.getByTestId('shipping-info-label')
        this.priceTotalLabel = page.getByTestId('total-info-label')

        // Finish Button Locator
        this.finishButton = page.getByTestId('finish')

        //Complete Header and Back Home Locators
        this.orderCompleteHeading = page.getByRole('heading', { name: 'Thank you for your order!', level: 2, exact: true })
        this.backToHomeButton = page.getByTestId('back-to-products')

    }

    async navigateToCheckoutPage() {
        await this.checkoutButton.click()
    }

    async fillOutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.checkoutFirstName.fill(firstName)
        await this.checkoutLastName.fill(lastName)
        await this.checkoutPostalCode.fill(postalCode)
        await this.checkoutButton.click()
    }

    async finishCheckout() {
        await this.finishButton.click()
    }

    async backToHome() {
        await this.backToHomeButton.click()
    }
}