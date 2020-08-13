import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PublishNewItemPage from './publishNewItemPage'

Given('The user {string} is logged whit {string} password', (user, password) => {
    PublishNewItemPage.login(user, password);
})

When('He publishes a new item', () => {
    PublishNewItemPage.publish()
})

When('He wants to publish a new item', () => {
    cy.get('a[data-target="#new-item"]').click();
    cy.get('input[type="file"]').attachFile('group5.jpg');
    cy.get('button').contains('Next').click();
})

Then('He should see the publication', () => {
    PublishNewItemPage.shouldSeeThePublication();
})
