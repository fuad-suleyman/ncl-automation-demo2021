const {Given, When, Then, setDefaultTimeout} = require ('cucumber');
const {browser, element} = require('protractor');
const GLOBALS = require('./../support/globals/global-vars');
const homepageElements = require('./../pages/homepage');
const vacationsElements = require('./../pages/vacations');
const vacationsPage = require('./../pages/vacations');
const { protractor } = require('protractor/built/ptor');
const { expect } = require('chai');
const { vacationMonth } = require('./../pages/vacations');

let counter = 0;
let selectedMonth = "a";

setDefaultTimeout(300*100);
  Given('client on ncl homepage',async function () {
     //await browser.waitForAngularEnabled(false); 
     await browser.get('https://www.ncl.com/');
     
     
  });

  Then('a client searches for sailings on first available month',async function () {
        await homepageElements.calendarButton.click();
        await browser.sleep(2000);
        let months = await homepageElements.months;

        for (let i = 0; i < months.length; i++) {
            const m =  months[i];
           if (await m.getAttribute('class')!=='btn-group disabled'){
            selectedMonth = await m.getText();
            console.log(" Enabled Month =>" + selectedMonth);
            await m.click();
                break;
           }
        }
  });

  Then('cruise counter on filter updates',async function () {

        await browser.sleep(2000);
        counter = await homepageElements.counter.getText();
        console.log("Count of the vacations: "+ counter);
        await homepageElements.apply.click();
  });

  When('filtered list of cruises is displayed',async function () {
        await homepageElements.findACruise.click();
        await browser.sleep(2500);
        let message = await vacationsPage.pageMessage.getText();
        expect(message).equal('BOOK YOUR VACATION WITH PEACE OF MIND');

  });

  Then('all displayed cruises should start on selected month',async function () {
         await vacationsPage.closePop.click();
         await browser.sleep(2000)
         await vacationsPage.viewMoreResults.click();
         let param = selectedMonth;
         let vacationMonths = vacationsPage.vacationMonth(selectedMonth);
         for (let i = 0; i < vacationMonths.length; i++) {
             const expectedMonth = await vacationMonths[i].getText();
             expect(selectedMonth).to.equal(expectedMonth);
             
         }
  });

  Then('number of displayed cruises should match previous counter on filter',async function () {
        let actualNumberOfCruiseVacatios = await (await vacationsPage.viewCruise).length;
        console.log(actualNumberOfCruiseVacatios);
        var counterEx = parseInt(counter);
        expect(counterEx).to.equal(actualNumberOfCruiseVacatios);
  });