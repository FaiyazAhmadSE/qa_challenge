// ***Frontend e2e test case***

/* Test Case #5 => Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default 
search, then unfold Birth date and search for Celebrities born the same day as today but exactly 40 
years ago. Now on the 1st result in the list, click on the 1st link you can find on the description (if 
any) and take a screenshot.
*/

const {test} = require('@playwright/test')

test('TestCase #5', async ({ page }) => {
    
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
    await page.getByTestId('accordion-item-birthDateAccordion').click()
    
    // Calculate the date 40 years ago
    const today = new Date()
    const currentDate = today.getDay()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()
    const requiredYear = currentYear-40
    
     // Format as MM-DD (with leading zeros if necessary)
     const formattedDate = (requiredYear < 1000 ? '0' : '') + requiredYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth;

     
     // Input to the date fields
     await page.getByTestId('birthYearMonth-start').click()
     await page.getByTestId('birthYearMonth-start').fill(formattedDate)
     await page.getByTestId('birthYearMonth-end').click()
     await page.getByTestId('birthYearMonth-end').fill(formattedDate)

     // Scenario workflow continues
     await page.locator('div').filter({ hasText: /^See results$/ }).click()  
     await page.getByTestId('adv-search-get-results').click()
     const firstLink = await page.locator('li:nth-child(1) > .ipc-metadata-list-summary-item__c').getByRole("link", {name:'1.',exact:false}).click()

     if (firstLink) {
        await firstLink.click();
      } else {
        console.log('No link found for given search.');
      }
     
     // Take the screenshot of 1st name in the list
     await page.screenshot({ path: 'tests/screenshot/'+'screenshot2.png', fullPage:true })


})