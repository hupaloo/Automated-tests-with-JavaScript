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

    it(' should check/uncheck rate marks in "Refine your search field"', async function(){
        await searchForm.refineYourSearchBtn.click();
        expect(await searchOptions.bodySearchArea.isPresent()).toBe(true, 'Field area is not displayed after opening it');

        let rateMarksNumber = await searchOptions.numberOfElems("Guest");

        // cycle to uncheck(by clicking) all rate marks except the last uncheckable one
        for (let i = 0; i < await searchOptions.numberOfElems("Guest"); i++){
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Guest").get(i))).toBe(true, 'Rate mark is not selected');
            await searchOptions.getElements("Guest").get(i).click();
            if(i === rateMarksNumber - 1){
                expect(await searchOptions.isElemChecked(await searchOptions.getElements("Guest").get(i))).toBe(true, 'Rate mark is not selected');
                break;
            }
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Guest").get(i))).toBe(false, 'Rate mark is already selected');
        }

        // cycle to check(by clicking) all rate marks
        for (let i = rateMarksNumber - 1; i >= 0; i--)
        {
            await searchOptions.getElements("Guest").get(i).click();
            expect(searchOptions.isElemChecked((await searchOptions.getElements("Guest"))[i])).toBe(true, 'Rate mark is not selected');
        }

        await searchOptions.getElements("Guest").get(rateMarksNumber - 1).click();

        for (let i = 0; i < rateMarksNumber - 1; i++) {
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Guest").get(i))).toBe(false, 'Rate mark is already selected');
        }

        await searchOptions.getElements("Guest").get(0).click();

        for (let i = 0; i < rateMarksNumber; i++) {
            expect(await searchOptions.isElemChecked(searchOptions.getElements("Guest").get(i))).toBe(true, 'Rate mark is not selected');
        }
    });
});
