// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('');
    cy.get('[data-cy="lpLoginForm"]').click({ force: true });
    cy.get('[data-cy="lpLoginUsername"]').type(username, { force: true });
    cy.get('[data-cy="lpLoginPassword"]').type(password, { force: true });
    cy.get('[data-cy="lpLoginSubmit"]').click({ force: true });
})