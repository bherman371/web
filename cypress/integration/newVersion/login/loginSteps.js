import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import LoginPage from './loginPage'

Given('The user opens landing page', () => {
    LoginPage.visit();
})

When('He fills the login form with {string} as email and {string} as password', (user, password) => {
    LoginPage.clickLoginForm()
    LoginPage.fillUsername(user);
    LoginPage.fillPassword(password);
    LoginPage.submit();
})

Then('He should see the news feed', () => {
    LoginPage.checkUrl("news-feed");
    LoginPage.getElement("[data-cy='nfHeader']");
})
