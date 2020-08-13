const LINK_LOGIN_FORM = '[data-cy="lpLoginForm"]';
const USER_INPUT = '[data-cy="lpLoginUsername"]';
const PASSWORD_INPUT = '[data-cy="lpLoginPassword"]';
const LOGIN_BUTTON = '[data-cy="lpLoginSubmit"]';

class LoginPage {
    static visit() {
        cy.visit('');
    }

    static clickLoginForm() {
        cy.get(LINK_LOGIN_FORM).click({ force: true });
    }

    static fillUsername(user) {
        cy.get(USER_INPUT).type(user, { force: true });
    }

    static fillPassword(password) {
        cy.get(PASSWORD_INPUT).type(password, { force: true });
    }

    static submit() {
        cy.get(LOGIN_BUTTON).click({ force: true });
    }

    static checkUrl(url) {
        cy.url().should('include', url)
    }

    static getElement(property) {
        cy.get(`${property}`).should('be.visible')
    }
}

export default LoginPage;
