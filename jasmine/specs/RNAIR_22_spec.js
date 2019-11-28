const { browser } = require('protractor');
const MainPage = require('../pages/main_page');
const Calendar = require('../pages/calendar');
const CookiesPolicy = require('../pages/cookies_policy');
const cookiesPolicy = new CookiesPolicy();
const searchForm = new MainPage();
const calendar = new Calendar();

describe('As a user I', function(){

    beforeAll(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.get('/', 20000, 'Home page is not loaded after 20 sec');
        if (await cookiesPolicy.closeButton.isPresent()) {
            await cookiesPolicy.closeButton.click();
        }
    });

    it(' should change the months in calendar by clicking top/main arrows', async function(){
        await searchForm.checkInField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        // check top bar months scrolling by clicking left/right arrows

        let i = 1;
        let monthName;
        let monthNameNext;
        let monthNamePrev;

        while(!await calendar.isDisabled(calendar.getArrow('right')))     // cycle to click right top arrow until it become disabled
        {
            monthName = await calendar.topMonths.get(i).getText();
            await calendar.getArrow('right').click();
            i += 1;
            monthNameNext = await calendar.topMonths.get(i).getText();
            expect(monthName).not.toEqual(monthNameNext, 'Top bar month name equal to itself after moving to another month');
        }

        while(!await calendar.isDisabled(calendar.getArrow('left')))     // cycle to click left top arrow until it become disabled
        {
            monthName = await calendar.topMonths.get(i).getText();
            await calendar.getArrow('left').click();
            i -= 1;
            monthNamePrev = await calendar.topMonths.get(i).getText();
            expect(monthName).not.toEqual(monthNamePrev, 'Top bar month name equal to itself after moving to another month');
        }

        // check top bar months changing by clicking their names

        let numberOfMonths = await calendar.topMonthsBar.count();

        for (let j = 0; j < numberOfMonths; j++ ) {
            if (j > numberOfMonths/2 - 3){
                await calendar.getArrow('right').click();
            }
            await calendar.topMonths.get(j).click();
            if (j !== 0){
                expect(await calendar.topMonthsBar.get(j - 1).getAttribute('class')).not.toContain('selected', 'Month in the top bar is selected');
            }
            expect(await calendar.topMonthsBar.get(j).getAttribute('class')).toContain('selected', 'Month in the top bar is not selected');
            if (j <= (numberOfMonths - 2)) {
                expect(await calendar.topMonthsBar.get(j + 1).getAttribute('class')).toContain('selected', 'Month in the top bar is not selected');
            }
            if (j <= (numberOfMonths - 3)) {
                expect(await calendar.topMonthsBar.get(j + 2).getAttribute('class')).not.toContain('selected', 'Month in the top bar is selected');
            }
        }

        //check main calendar area months changing by clicking left/right arrows

        while (!await calendar.isDisabled(calendar.getMainArrow('left')))        // cycle to click left main arrow until it become disabled
        {
            monthName = await calendar.mainMonths.last().getText();
            await calendar.getMainArrow('left').click();
            let monthNamePrev = await calendar.mainMonths.last().getText();
            expect(monthName).not.toEqual(monthNamePrev, 'Month name equal to itself after moving to another month');
        }

        while (!await calendar.isDisabled(calendar.getMainArrow('right')))        // cycle to click right main arrow until it become disabled
        {
            monthName = await calendar.mainMonths.first().getText();
            await calendar.getMainArrow('right').click();
            monthNameNext = await calendar.mainMonths.first().getText();
            expect(monthName).not.toEqual(monthNameNext, 'Month name equal to itself after moving to another month');
        }
    });
});
