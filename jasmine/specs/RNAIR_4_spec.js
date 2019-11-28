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

    it(' should change detailed feedback to another by clicking arrows', async function(){
        await browser.actions().mouseMove(feedback.feedbackArea).perform();
        await browser.wait(EC.presenceOf(feedback.sliderElementButton(1, 1)), 5000, 'Feedback button is not preset after 5 sec');
        await feedback.sliderElementButton(1, 1).click();

        const firstCardName = await detailFeedback.feedbackName(1).getText();
        const firstCardCity = await detailFeedback.feedbackCity(1).getText();
        const firstCardText = await detailFeedback.feedbackText(1).getText();

        // cycle to change all cards inside slider by clicking right arrow
        for (let i = 1; i < await detailFeedback.numberOfCards(); i++) {
            let feedbackName = await detailFeedback.feedbackName(i).getText();
            let feedbackCity = await detailFeedback.feedbackCity(i).getText();
            let feedbackText = await detailFeedback.feedbackText(i).getText();

            expect(await detailFeedback.getArrow('right').isPresent()).toBe(true, 'Right arrow is not visible');
            await detailFeedback.getArrow('right').click();

            let feedbackNameNext = await detailFeedback.feedbackName(i + 1).getText();
            let feedbackCityNext = await detailFeedback.feedbackCity(i + 1).getText();
            let feedbackTextNext = await detailFeedback.feedbackText(i + 1).getText();

            expect(await feedbackName).not.toEqual(feedbackNameNext, 'Feedback person name equal to next person name');
            expect(await feedbackCity).not.toEqual(feedbackCityNext, 'Feedback city name equal to next city name');
            expect(await feedbackText).not.toEqual(feedbackTextNext, 'Feedback review equal to next review');
        } // end of cycle


        // cycle to change all cards inside slider by clicking left arrow
        for (let i = await detailFeedback.numberOfCards(); i > 0; i--) {
            let feedbackName = await detailFeedback.feedbackName(i).getText();
            let feedbackCity = await detailFeedback.feedbackCity(i).getText();
            let feedbackText = await detailFeedback.feedbackText(i).getText();

            if (i !== 1) {
                expect(await detailFeedback.getArrow('left').isPresent()).toBe(true, 'Left arrow is not visible');
                await detailFeedback.getArrow('left').click();

                let feedbackNamePrev = await detailFeedback.feedbackName(i - 1).getText();
                let feedbackCityPrev = await detailFeedback.feedbackCity(i - 1).getText();
                let feedbackTextPrev = await detailFeedback.feedbackText(i - 1).getText();

                expect(await feedbackName).not.toEqual(feedbackNamePrev, 'Feedback person name equal to next person name');
                expect(await feedbackCity).not.toEqual(feedbackCityPrev, 'Feedback city name equal to next city name');
                expect(await feedbackText).not.toEqual(feedbackTextPrev, 'Feedback review equal to next review');
            }
            else{
                expect(await feedbackName).toEqual(firstCardName, 'Feedback person name is not equal to itself after returning back');
                expect(await feedbackCity).toEqual(firstCardCity, 'Feedback person city is not equal to itself after returning back');
                expect(await feedbackText).toEqual(firstCardText, 'Feedback person review is not equal to itself after returning back');
            }
        } // end of cycle
    });
});
