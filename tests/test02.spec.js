// ***Frontend e2e test case***

/* Test Case #2 => Go to IMDb.com, unfold the Menu and navigate to the Top Box Office section; then click on the 2nd 
item on the Top box office list; then click on the IMDb Rating button, click on the Rate button, and 
set a 5 stars Rating and click on the Rate button in the modal.
*/

const {test} = require('@playwright/test')

test('TestCase #2', async ({ page }) => {
    
    await page.goto('https://IMDb.com')

    // Handling of pop-up
    try {
    await page.getByText('Accept').click() 
        } catch (error) {
    console.log('Pop up is not shown.')   
                        }
    // Scenario workflow               
    await page.locator('.ipc-icon.ipc-icon--menu.ipc-responsive-button__icon').click()
    await page.locator('text=Top Box Office').click()
    await page.getByRole('link', { name: '2.', exact:false }).click()
    await page.getByRole('link', { name: 'View User Ratings' }).click()
    await page.waitForTimeout(1000)
    await page.getByTestId('rating-button__user-rating__unrated').click()
    await page.locator('.ipc-starbar__rating__button[aria-label="Rate 5"]').click({force:true})
    await page.getByRole('button', { name: 'Rate', exact: true }).click()  
    //await page.locator('.ipc-rating-prompt__rate-button').click() => Not implemented because asking for login
    

});