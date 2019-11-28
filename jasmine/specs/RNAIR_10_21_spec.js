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

    it(' should see check-in/check-out date/nights after selecting it in calendar', async function(){

        let calendarInfoBar;
        let calendarInfoNights;
        await searchForm.checkInField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        // click the first active date in calendar
        await calendar.getActiveDates(2).get(0).click();
        expect(await calendar.getActiveDate(2).get(0).getAttribute('class')).toContain('start', 'Start selected date is not highlighted');

        // click the 21` active date in calendar
        await browser.actions().mouseMove(calendar.getActiveDates(2).get(20)).perform();
        calendarInfoBar = await calendar.calendarInfo('bar').getText();
        calendarInfoNights = await calendar.calendarInfo('label--highlighted').getText();
        expect(await calendar.getActiveDate(2).get(20).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        await calendar.getActiveDates(2).get(20).click();

        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');

        expect(calendarInfoBar).toContain(await searchForm.checkInDate.getText(), 'Check-in date is not appeared/wrong value in the info bar');
        expect(calendarInfoBar).toContain(await searchForm.checkOutDate.getText(), 'Check-out date is not appeared/wrong value in the info bar');
        expect(calendarInfoNights).toContain(await searchForm.nightsNumber.getText(), 'Nights number is not appeared/wrong value in the info bar');
    });
});
