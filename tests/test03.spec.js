// ***Frontend e2e test case***

/* Test Case #3 => Go to IMDb.com, unfold the Menu button, and navigate to the Top 250 TV Shows section; then click 
on Breaking Bad, go to the Photos, display only Danny Trejo's photos, and then click on the 2nd 
photo in the list.
*/

const {test, expect} = require('@playwright/test')

test('TestCase #3', async ({ page }) => {
    
    await page.goto('https://IMDb.com')

    // Handling of pop-up
    try {
    await page.getByText('Accept').click()
    } catch (error) {
        console.log('Pop up is not shown.')    
    }
    
    // Scenario workflow 
    await page.locator('.ipc-icon.ipc-icon--menu.ipc-responsive-button__icon').click()
    await page.locator('text=Top 250 TV Shows').click()
    await page.getByText('1. Breaking Bad').click()
    await page.getByTestId('hero__photo-link').click()
    await page.getByTestId('mv-gallery-button').click()
    await page.getByTestId('image-chip-dropdown-test-id').click()
    await page.getByTestId('image-names-filter-container-test-id').locator('[id="Person-filter-select-dropdown"]').click()
    const dropdownlist = page.locator('[id="Person-filter-select-dropdown"]')
    dropdownlist.selectOption('nm0001803')
    await page.getByLabel('Close Prompt').click()
    
    // select 2nd photo from list
    await page.locator('[data-testid="sub-section-images"] a:nth-of-type(2)').click()
   
})