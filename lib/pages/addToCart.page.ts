import { type Locator, type Page } from '@playwright/test'

export class AddToCartPage {
    readonly page: Page

    // Sauce Lab Backpack
    readonly sauceLabBackPackMainHeading: Locator
    readonly sauceLabBackPackDescription: Locator
    readonly sauceLabBackPackPrice: Locator
    readonly backpackAddButton: Locator
    readonly backPackRemoveButton: Locator

    // Sauce Labs Bike Light
    readonly sauceLabBikeLightMainHeading: Locator
    readonly sauceLabBikeLightDescription: Locator
    readonly sauceLabBikeLightPrice: Locator
    readonly bikelightAddButton: Locator
    readonly bikelightRemoveButton: Locator

    // Shopping Cart Badge Locators
    readonly shoppingCartBadge: Locator


    constructor(page: Page) {
        this.page = page

        // Sauce Lab Locators
        const sauceLabBackPack = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' })
        this.sauceLabBackPackMainHeading = sauceLabBackPack.getByTestId('item-4-title-link')
        this.sauceLabBackPackDescription = sauceLabBackPack.getByTestId('inventory-item-desc')
        this.sauceLabBackPackPrice = sauceLabBackPack.getByTestId('inventory-item-price')
        this.backpackAddButton = sauceLabBackPack.getByRole('button', { name: 'Add to cart', exact: true })
        this.backPackRemoveButton = sauceLabBackPack.getByRole('button', { name: 'Remove', exact: true })

        // Bike Light Locators
        const sauceLabBikeLight = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' })
        this.sauceLabBikeLightMainHeading = sauceLabBikeLight.getByTestId('inventory-item-name')
        this.sauceLabBikeLightDescription = sauceLabBikeLight.getByTestId('inventory-item-desc')
        this.sauceLabBikeLightPrice = sauceLabBikeLight.getByTestId('inventory-item-price')
        this.bikelightAddButton = sauceLabBikeLight.getByRole('button', { name: 'Add to cart', exact: true })
        this.bikelightRemoveButton = sauceLabBikeLight.getByRole('button', { name: 'Remove', exact: true })

        //Shopping Cart Badge Locators
        this.shoppingCartBadge = page.getByTestId('shopping-cart-link')
    }

    async goToCart() {
        await this.shoppingCartBadge.click()
    }
}
