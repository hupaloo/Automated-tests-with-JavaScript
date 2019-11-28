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

    it(' should open calendar by clicking check-in/check-out field and choose the dates', async function(){

        // 1) Open calendar by clicking check-in field

        await searchForm.checkInField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        // select the first active date in calendar by click
        await calendar.getActiveDates(2).get(0).click();
        expect(await calendar.getActiveDate(2).get(0).getAttribute('class')).toContain('start', 'Start selected date is not highlighted');

        // click the 28` active date in calendar (can`t be > 28 days for reservation)
        await browser.actions().mouseMove(await calendar.getActiveDates(2).get(27)).perform();
        expect(await calendar.getActiveDate(2).get(27).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        await calendar.getActiveDates(2).get(27).click();

        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');

        // 2) Open calendar by clicking check-out field

        // select the date that is between the first active date and the 28`s active date
        await searchForm.checkOutField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();
        await browser.actions().mouseMove(await calendar.getActiveDates(2).get(12)).perform();
        expect(await calendar.getActiveDate(2).get(12).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        await calendar.getActiveDates(2).get(12).click();
        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');
    });
});
