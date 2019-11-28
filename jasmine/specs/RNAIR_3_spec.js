const { browser } = require('protractor');
const EC = require('protractor').ExpectedConditions;
const DetailFeedback = require('../pages/detail_feedback');
const Slider = require('../pages/slider');
const CookiesPolicy = require('../pages/cookies_policy');
const cookiesPolicy = new CookiesPolicy();
const feedback = new Slider();
const detailFeedback = new DetailFeedback();

describe('As a user I', function(){

    beforeAll(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.get('/', 20000, 'Home page is not loaded after 20 sec');
        if (await cookiesPolicy.closeButton.isPresent()) {
            await cookiesPolicy.closeButton.click();
        }
    });

    it(' should open detailed feedback in pop-up by clicking on "see more" link and close with "x"', async function(){
        await browser.actions().mouseMove(feedback.feedbackArea).perform();

        let sliderNumber = await feedback.slidersNumber();
        let elemsInSlider;
        let cardCounter = 1;

        // cycle to change slider section by clicking arrow
        for (let i = 1; i <= sliderNumber; i++) {
            elemsInSlider = await feedback.sliderSectionElementsNumber(i);
            await browser.wait(EC.visibilityOf((feedback.sliderElementButton(i, elemsInSlider))), 5000);

            // cycle to open all `See More` button inside one slider section
            for (let j = 1; j <= elemsInSlider; j++) {
                await feedback.sliderElementButton(i, j).click();
                expect(await detailFeedback.feedbackArea.isPresent()).toBe(true, 'Feedback area is not displayed');
                expect(await detailFeedback.feedbackName(cardCounter).isPresent()).toBe(true, 'Feedback name is not displayed');
                expect(await detailFeedback.feedbackCity(cardCounter).isPresent()).toBe(true, 'Feedback city is not displayed');
                expect(await detailFeedback.feedbackText(cardCounter).isPresent()).toBe(true, 'Feedback text is not displayed');
                expect(await detailFeedback.getArrow('left').isPresent()).toBe(true, 'Left arrow is not displayed');
                expect(await detailFeedback.getArrow('right').isPresent()).toBe(true, 'Right arrow is not displayed');
                expect(await detailFeedback.closeBtn.isPresent()).toBe(true, 'Feedback close button is not displayed');
                await detailFeedback.closeBtn.click();
                expect(await detailFeedback.feedbackArea.isPresent()).toBe(false, 'Feedback area is still displayed');
                cardCounter++;
            } // end of cycle for (let j = 1; j <= elemsInSlider; j++)
            await feedback.getArrow('right').click();
        } // end of cycle for (let i = 1; i <= sliderNumber; i++)
    });
});
