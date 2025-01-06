// ***Frontend e2e test case***

/* Test Case #1 => Go to IMDb.com, search for Nicolas Cage and access his profile; then unfold the Upcoming tab in 
the Credits section, and click on the first movie with a Completed tag. We want to make sure that 
this scenario is working on Chrome and Firefox.
*/

const {test, expect} = require('@playwright/test')

test('TestCase #1', async ({ page }) => {
    
    await page.goto('https://IMDb.com')

    // Handling of pop-up
    try {
    await page.getByText('Accept').click()   
        } catch (error) {
    console.log('Pop up is not shown.')  
                        }
    // Scenario workflow 
    await page.locator('#suggestion-search').fill("Nikolas Cage")
    await page.locator('#suggestion-search-button').click()
    await page.getByTestId('find-results-section-name').getByRole('link', {name: 'Nicolas Cage'}).click()
    await page.getByTestId('accordion-item-actor-upcoming-projects').click()
    await page.locator('text=Completed').click()

    // Verification of title of the clicked movie
    expect(await page.title()).toContain('The Gunslingers')
    

})