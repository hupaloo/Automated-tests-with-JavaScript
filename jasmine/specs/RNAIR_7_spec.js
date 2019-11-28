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

    it(' should open calendar by clicking check-in/check-out field and close by clicking external area', async function(){

        // 1) Open calendar by clicking check-in field

        await searchForm.checkInField.click();
        expect(await calendar.calendarArea.isPresent()).toBe(true, 'Calendar area is not displayed');
        await calendar.externalArea.click();
        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed');

        // 2) Open calendar by clicking check-out field

        await searchForm.checkOutField.click();
        expect(await calendar.calendarArea.isPresent()).toBe(true, 'Calendar area is not displayed');
        await calendar.externalArea.click();
        expect(await calendar.calendarArea.isPresent()).toBe(false, 'Calendar area still displayed');
    });
});
