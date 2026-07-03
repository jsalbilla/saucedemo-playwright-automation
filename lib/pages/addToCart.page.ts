import {type Locator, type Page} from '@playwright/test'

export class AddToCartPage {
    readonly page: Page

    // Sauce Lab Backpack
    readonly sauceLabBackPackMainHeading: Locator
    readonly sauceLabBackPackDescription: Locator
    readonly sauceLabBackPackPrice: Locator
    readonly sauceLabBackPackAddToCart: Locator

    //Sauce Labs Bike Light
    readonly sauceLabBikeLightMainHeading: Locator
    readonly sauceLabBikeLightDescription: Locator
    readonly sauceLabBikeLightPrice: Locator
    readonly sauceLabBikeLightAddToCartButton: Locator
    constructor (page: Page) {
        this.page = page
        const sauceLabBackPack = page.getByTestId('inventory-item')
            .filter({ hasText: 'Sauce Labs Backpack' })

        this.sauceLabBackPackMainHeading = sauceLabBackPack.getByTestId('item-4-title-link')
        this.sauceLabBackPackDescription = sauceLabBackPack.getByTestId('inventory-item-desc')
        this.sauceLabBackPackPrice = sauceLabBackPack.getByTestId('inventory-item-price')
        this.sauceLabBackPackAddToCart = sauceLabBackPack.getByRole('button', {name: 'Add to cart',exact: true})

        const sauceLabBikeLight = page.getByTestId('inventory-item').filter({hasText: 'Sauce Labs Bike Light'})
        this.sauceLabBikeLightMainHeading = sauceLabBikeLight.getByTestId('inventory-item-name')
        this.sauceLabBikeLightDescription = sauceLabBikeLight.getByTestId('inventory-item-desc')
        this.sauceLabBikeLightPrice = sauceLabBikeLight.getByTestId('inventory-item-price')
        this.sauceLabBikeLightAddToCartButton = sauceLabBikeLight.getByRole('button', {name: 'Add to cart', exact: true})
    }
}
