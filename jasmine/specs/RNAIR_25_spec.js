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

    it(' should login after entering valid data', async function() {

        await header.logInBtn.click();
        expect(await browser.wait(EC.presenceOf(loginPage.body), 5000)).toBe(true, 'Login page is not displayed');
        await loginPage.emailInput.sendKeys('unsam2000@gmail.com');
        await loginPage.passwordInput.sendKeys('Ryanair2429');
        await loginPage.loginBtn.click();
        expect(await browser.wait(EC.invisibilityOf(loginPage.body), 5000)).toBe(true, 'Login page is not displayed');
        expect(await browser.wait(EC.presenceOf(header.userIcon), 5000)).toBe(true, 'User icon is not displayed after log in');
        expect(await browser.wait(EC.presenceOf(header.userName), 5000)).toBe(true, 'User name is not displayed after log in');
        expect(await header.userName.getText()).toBe('Никита', 'Name is not equal to the account user name');
    });
});
