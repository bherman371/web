import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import RegisterPage from './registerPage';
const uniqid = require('uniqid');

Given('The user opens landing page', () => {
    RegisterPage.visit();
})

When('He fills the registration form with {string} as password', password => {
    RegisterPage.clickRegisterForm();
    RegisterPage.fillUsername(uniqid());
    RegisterPage.fillEmail(uniqid('', '@wctest.com'));
    RegisterPage.fillPassword(password);
    RegisterPage.confirmPassword(password);
    RegisterPage.acceptTermsAndConditions();
    RegisterPage.submit();
})

Then('He should see the notification of success', () => {
    RegisterPage.shouldSeeNotificationOfSuccess();
})
