// ***Frontend e2e test case***

/* Test Case #4 => Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default 
search, then unfold Birthday and search for Celebrities born yesterday. Click on the 3rd name in the 
list and take a screenshot.
*/

const {test} = require('@playwright/test')

test('TestCase #4', async ({ page }) => {
    
    
    await page.goto('https://IMDb.com')

    // Handling of pop-up
    try {
    await page.getByText('Accept').click()
    } catch (error) {
        console.log('Pop up is not shown.')    
    }
    
    // Scenario workflow 
    await page.locator('.ipc-icon.ipc-icon--menu.ipc-responsive-button__icon').click()
    await page.locator('text=Born Today').click()
    await page.locator('.sc-d0cccb56-0').click()
    await page.getByTestId('accordion-item-birthdayAccordion').click()
    
    // Calculate yesterday date
    const date = new Date()
    const month = date.getMonth() + 1 // Month is 0-indexed, so adding 1 makes it 1-12

    // Get the day of the month
    const day = date.getDate()
    const yesterday = day-1

    // Format as MM-DD (with leading zeros if necessary)
    const formattedDate = (month < 10 ? '0' : '') + month + '-' + (yesterday < 10 ? '0' : '') + yesterday

    // Scenario workflow continues
    await page.getByTestId('birthday-input-test-id').click()
    await page.getByTestId('birthday-input-test-id').fill(formattedDate)
    await page.locator('div').filter({ hasText: /^See results$/ }).click()  
    await page.getByTestId('adv-search-get-results').click()
    await page.locator('li:nth-child(3) > .ipc-metadata-list-summary-item__c').getByRole("link", {name:'3.',exact:false}).click()
    
    // Take the screenshot of 3rd name in the list
    await page.screenshot({path:'tests/screenshot/'+'screenshot1.png',fullPage:true})

    


});