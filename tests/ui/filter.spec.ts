import { test, expect } from '../../lib/fixtures/saucedemo.fixture'

test.describe('Filter/Sorting Functionality', async () => {
    test('should have working filter functionality', async ({ filterPage, page }) => {
        await expect(filterPage.productSortContainer).toBeVisible()

        await test.step('Sorting by Name (A to Z)', async () => {
            await filterPage.productSortContainer.selectOption('az')
        })

        await test.step('Sorting by Name (Z to A)', async () => {
            await filterPage.productSortContainer.selectOption('za')
        })

        await test.step('Sorting by Name Price (low to high)', async () => {
            await filterPage.productSortContainer.selectOption('lohi')
        })


        await test.step('Sorting by Name Price (high to low)', async () => {
            await filterPage.productSortContainer.selectOption('hilo')
        })


    })
})