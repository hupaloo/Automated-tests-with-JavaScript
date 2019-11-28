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

    it(' should see an alert message if I select > 28 nights', async function() {

        await searchForm.checkInField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        let calendarErrorMessage;

        // click the first active date in left table inside calendar
        await calendar.getActiveDates(1).get(0).click();
        expect(await calendar.getActiveDate(1).get(0).getAttribute('class')).toContain('start', 'Start selected date is not highlighted');

        // click the 28` active date in calendar to cause an error (by selecting > 28 days for reservation)
        await browser.actions().mouseMove((await calendar.getActiveDates(2))[27]).perform();
        calendarErrorMessage = await calendar.calendarInfo('bar').getText();
        expect(await calendar.getActiveDate(2).get(27).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        expect(await calendar.calendarInfo('bar').getText()).toMatch(searchForm.nightsNumberErrorMsg(), 'Error message is not displayed');
        await calendar.getActiveDates(2).get(27).click();

        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');
        expect(calendarErrorMessage).toContain(await searchForm.maxStayErrorMsg.getText(), 'Error message is not displayed');
    });
});
