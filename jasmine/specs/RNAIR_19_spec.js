const { browser } = require('protractor');
const MainPage = require('../pages/main_page');
const SearchOptions = require('../pages/refine_search');
const CookiesPolicy = require('../pages/cookies_policy');
const cookiesPolicy = new CookiesPolicy();
const searchForm = new MainPage();
const searchOptions = new SearchOptions();

describe('As a user I', function(){

    beforeAll(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.get('/', 20000, 'Home page is not loaded after 20 sec');
        if (await cookiesPolicy.closeButton.isPresent()) {
            await cookiesPolicy.closeButton.click();
        }
    });

    it(' should check/uncheck stars in "Refine your search field"', async function(){
        await searchForm.refineYourSearchBtn.click();
        expect(await searchOptions.bodySearchArea.isDisplayed()).toBe(true, 'Field area is not displayed after opening it');

        for (let i = 0; i < await searchOptions.numberOfElems("Star"); i++)
        {
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Star").get(i))).toBe(false, 'Star is already selected');
            await searchOptions.getElements("Star").get(i).click();
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Star").get(i))).toBe(true, 'Star is not selected');
            await searchOptions.getElements("Star").get(i).click();
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Star").get(i))).toBe(false, 'Star is already selected');
        }
    });
});
