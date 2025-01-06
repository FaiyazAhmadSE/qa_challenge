/*const today = new Date();
const currentYear = today.getFullYear();
const requiredYear = currentYear-40;
console.log(requiredYear);
today.setFullYear(requiredYear);
console.log(today);

const currentDate = today.getDate();
const requiredDate = currentDate-1;
console.log(requiredDate);
today.setDate(requiredDate);
console.log(today);
*/

// function for splitting date into MM-DD format
/*function splitDate(date) {
    // Split the date string by the '-' delimiter
    const parts = date.split('-');
    
    // Extract the month and day from the resulting array
    const year = parts[0]
    const month = parts[1];
    const day = parts[2];
    
    return { year, month, day };
}
console.log(splitDate(yesterdayDate))

// calculating yesterday date
const today = new Date();
today.setDate(today.getDate() - 1);
const yesterdayDate = today.toISOString().split('T')[0];
console.log(splitDate(yesterdayDate)) */

const today = new Date();
const birthDate = new Date(today);
birthDate.setFullYear(today.getFullYear() - 40);
console.log("Birthday exactly 40 years ago:", birthDate.toLocaleString());

