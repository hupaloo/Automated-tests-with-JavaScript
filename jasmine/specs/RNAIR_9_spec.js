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

    it(' should select check-out date that earlier than check-in date and so check-out date should be changed to check-in date', async function(){

        // 1) Open calendar by clicking check-in field

        await searchForm.checkInField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        // select the 11` active date by click
        await calendar.getActiveDates(2).get(10).click();
        expect(await calendar.getActiveDate(2).get(10).getAttribute('class')).toContain('start', 'Start selected date is not highlighted');

        // select the 18` active date by click
        await browser.actions().mouseMove(calendar.getActiveDates(2).get(17)).perform();
        expect(await calendar.getActiveDate(2).get(17).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        await calendar.getActiveDates(2).get(17).click();

        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');

        // 2) Open calendar by clicking check-out field

        await searchForm.checkOutField.click();
        await browser.actions().mouseMove(calendar.calendarInfo('bar')).perform();

        // select the 4` active date by click
        await calendar.getActiveDates(2).get(3).click();
        expect(await calendar.getActiveDate(2).get(3).getAttribute('class')).toContain('start', 'Start selected date is not highlighted');

        // select the 25` active date by click
        await browser.actions().mouseMove(calendar.getActiveDates(2).get(24)).perform();
        expect(await calendar.getActiveDate(2).get(24).getAttribute('class')).toContain('end', 'End selected date is not highlighted');
        await calendar.getActiveDates(2).get(24).click();
        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed after closing it');
    });
});
