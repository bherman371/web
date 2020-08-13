const SEARCH_INPUT = '[data-cy="headerSearch"]';
const SEARCH_SUBMIT = '[data-cy="headerSearchSubmit"]';
const SEARCH_FILTER = '[data-cy="searchResultFilter"]';
const SEARCH_FILTER_ITEM_TYPE = '[data-cy="searchResultFilterItemType"]';
const SEARCH_FILTER_GROUP_TYPE = '[data-cy="searchResultFilterGroupType"]';
const SEARCH_FILTER_SUBMIT = '[data-cy="searchFilterSubmit"]';
const SEARCH_RESULTS_DIV = '[data-cy="divSearchResults"]';
const SEARCH_RESULTS_ITEM_LIST = '[data-cy="searchResultItem"]';
const SEARCH_RESULTS_GROUP_LIST = '[data-cy="searchResultGroup"]';
const SEARCH_RESULTS_USER_LIST = '[data-cy="searchResultUser"]';

class SearchAsUserPage {
    static login(user, password) {
        cy.login(user, password);
    }

    static seeNewsfeedPage() {
        cy.url().should('include', 's-app/news-feed');
    }

    static searchFor(input) {
        cy.get(SEARCH_INPUT).type(input, { force: true });
    }

    static submitSearch() {
        cy.get(SEARCH_SUBMIT).click({ force: true });
    }

    static filterByItem() {
        cy.get(SEARCH_FILTER).select('Item', { force: true });
    }

    static filterByItemType(type) {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        cy.get(SEARCH_FILTER_ITEM_TYPE).select(type, { force: true });
    }

    static filterByGroup() {
        cy.get(SEARCH_FILTER).select('Group', { force: true });
    }

    static filterByGroupType(type) {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        cy.get(SEARCH_FILTER_GROUP_TYPE).select(type, { force: true });
    }

    static filterByUser() {
        cy.get(SEARCH_FILTER).select('User', { force: true });
    }

    static applyFilter() {
        cy.get(SEARCH_FILTER_SUBMIT).click({ force: true });
    }

    static shouldSeeSearchResultPage() {
        cy.url().should('include', 's-app/search-result');
        cy.get(SEARCH_RESULTS_DIV).should('be.visible');
    }

    static shouldSeeItemsList() {
        cy.get(SEARCH_RESULTS_ITEM_LIST).should('exist');
    }

    static itemsListShouldNotExist() {
        cy.get(SEARCH_RESULTS_ITEM_LIST).should('not.exist');
    }

    static shouldSeeGroupsList() {
        cy.get(SEARCH_RESULTS_GROUP_LIST).should('exist');
    }

    static groupsListShouldNotExist() {
        cy.get(SEARCH_RESULTS_GROUP_LIST).should('not.exist');
    }

    static shouldSeeUsersList() {
        cy.get(SEARCH_RESULTS_USER_LIST).should('exist');
    }

    static usersListShouldNotExist() {
        cy.get(SEARCH_RESULTS_USER_LIST).should('not.exist');
    }

    static shouldSeeOnlyItemTypeInResults(type) {
        cy.get(SEARCH_RESULTS_ITEM_LIST).each((value) => {
            cy.get(value).should('have.attr', 'data-cy-type', type);
        });
    }

    static shouldSeeOnlyGroupTypeInResults(type) {
        cy.get(SEARCH_RESULTS_GROUP_LIST).each((value) => {
            cy.get(value).should('have.attr', 'data-cy-type', type);
        });
    }
}

export default SearchAsUserPage;
