import { type Locator, type Page } from '@playwright/test'

export class FilterPage {
    readonly page: Page
    readonly productSortContainer: Locator
    readonly filterActiveOption: Locator
    constructor(page: Page) {
        this.page = page
        this.productSortContainer = page.getByTestId('product-sort-container')
        this.filterActiveOption = page.getByTestId('active-option')
    }
}