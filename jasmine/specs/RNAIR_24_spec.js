const { browser } = require('protractor');
const EC = require('protractor').ExpectedConditions;
const Header = require('../pages/header');
const CookiesPolicy = require('../pages/cookies_policy');
const header = new Header();
const cookiesPolicy = new CookiesPolicy();
const Login = require('../pages/login_form');
const loginPage = new Login();

xdescribe('As a user I', function(){

    beforeAll(async () => {
        await browser.waitForAngularEnabled(true);
        await browser.get('/', 20000, 'Home page is not loaded after 20 sec');
        if (await cookiesPolicy.closeButton.isPresent()) {
            await cookiesPolicy.closeButton.click();
        }
    });

    it(' should open login form in pop-up by clicking on "Log in" button and close with "x"', async function() {

        await header.logInBtn.click();
        expect(await browser.wait(EC.presenceOf(loginPage.body), 5000)).toBe(true, 'Login page is not displayed');
        expect(await browser.wait(EC.presenceOf(loginPage.emailInput), 5000)).toBe(true, 'Email input field is not displayed');
        expect(await browser.wait(EC.presenceOf(loginPage.passwordInput), 5000)).toBe(true, 'Password input field is not displayed');
        expect(await browser.wait(EC.presenceOf(loginPage.closeBtn), 5000)).toBe(true, 'Close button is not displayed');
        expect(await browser.wait(EC.presenceOf(loginPage.loginBtn), 5000)).toBe(true, 'Login button is not displayed');
        await loginPage.closeBtn.click();
        expect(await browser.wait(EC.invisibilityOf(loginPage.body), 5000)).toBe(true, 'Login page is not displayed');
    });
});
