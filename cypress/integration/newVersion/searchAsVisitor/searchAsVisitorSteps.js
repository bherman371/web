import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import SearchAsVisitorPage from './searchAsVisitorPage'

Given('The visitor accesses the website', () => {
    SearchAsVisitorPage.clearCookies();
    SearchAsVisitorPage.clearLocalStorage();
    SearchAsVisitorPage.visit();
})

Given('He wants to do a search', () => {
    SearchAsVisitorPage.searchFor(' ');
    SearchAsVisitorPage.submitSearch();
})

When('He filters by item', () => {
    SearchAsVisitorPage.filterByItem();
    SearchAsVisitorPage.applyFilter();
})

When('He filters by group', () => {
    SearchAsVisitorPage.filterByGroup();
    SearchAsVisitorPage.applyFilter();
})

When('He filters by user', () => {
    SearchAsVisitorPage.filterByUser();
    SearchAsVisitorPage.applyFilter();
})

When('He filters by item {string}', (type) => {
    SearchAsVisitorPage.filterByItemType(type);
    SearchAsVisitorPage.applyFilter();
})

When('He filters by group {string}', (type) => {
    SearchAsVisitorPage.filterByGroupType(type);
    SearchAsVisitorPage.applyFilter();
})

Then('He should see only items in the search results', () => {
    SearchAsVisitorPage.shouldSeeSearchResultPage();
    SearchAsVisitorPage.shouldSeeItemsList();
    SearchAsVisitorPage.groupsListShouldNotExist();
    SearchAsVisitorPage.usersListShouldNotExist();
})

Then('He should see only groups in the search results', () => {
    SearchAsVisitorPage.shouldSeeSearchResultPage();
    SearchAsVisitorPage.itemsListShouldNotExist();
    SearchAsVisitorPage.shouldSeeGroupsList();
    SearchAsVisitorPage.usersListShouldNotExist();
})

Then('He should see only users in the search results', () => {
    SearchAsVisitorPage.shouldSeeSearchResultPage();
    SearchAsVisitorPage.itemsListShouldNotExist();
    SearchAsVisitorPage.groupsListShouldNotExist();
    SearchAsVisitorPage.shouldSeeUsersList();
})

Then('He should see only {string} items in the search results', (type) => {
    SearchAsVisitorPage.shouldSeeSearchResultPage();
    SearchAsVisitorPage.shouldSeeOnlyItemTypeInResults(type);
})

Then('He should see only {string} groups in the search results', (type) => {
    SearchAsVisitorPage.shouldSeeSearchResultPage();
    SearchAsVisitorPage.shouldSeeOnlyGroupTypeInResults(type);
})
