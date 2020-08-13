const REGISTER_FORM = '[data-cy="lpRegistrationForm"]';
const USERNAME_INPUT = '[data-cy="lpRegistrationUsername"]';
const EMAIL_INPUT = '[data-cy="lpRegistrationEmail"]';
const PASSWORD_INPUT = '[data-cy="lpFormRegistrationForm"] input.VuePassword__Input';
const CONFIRM_PASSWORD_INPUT = '[data-cy="lpRegistrationConfirmPassword"]';
const TERMS_AND_CONDITIONS = '[data-cy="lpRegistrationAcceptTerms"]';
const REGISTRATION_BUTTON = '[data-cy="lpRegistrationSubmit"]';
const NOTIFICATION_TEXT = '[data-cy="lpRegistrationResponse"]';

class RegisterPage {
    static visit() {
        cy.visit('');
    }

    static clickRegisterForm() {
        cy.get(REGISTER_FORM).click({ force: true });
    }

    static fillUsername(user) {
        cy.get(USERNAME_INPUT).type(user, { force: true });
    }

    static fillEmail(email) {
        cy.get(EMAIL_INPUT).type(email, { force: true });
    }

    static fillPassword(password) {
        cy.get(PASSWORD_INPUT).type(password, { force: true });
    }

    static confirmPassword(password) {
        cy.get(CONFIRM_PASSWORD_INPUT).type(password, { force: true });
    }

    static acceptTermsAndConditions() {
        cy.get(TERMS_AND_CONDITIONS).click({ force: true });
    }

    static submit() {
        cy.get(REGISTRATION_BUTTON).click({ force: true });
    }

    static shouldSeeNotificationOfSuccess() {
        cy.get(NOTIFICATION_TEXT).contains('Registration successful').should('be.visible');
    }
}

export default RegisterPage;
