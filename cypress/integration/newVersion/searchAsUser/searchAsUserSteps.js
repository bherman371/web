import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import SearchAsUserPage from './searchAsUserPage'

Given('The user {string} is logged whit {string} password', (user, password) => {
    SearchAsUserPage.login(user, password);
})

Given('The user is seeing the news feed', () => {
    SearchAsUserPage.seeNewsfeedPage();
})

Given('He wants to a search for {string}', (input) => {
    SearchAsUserPage.searchFor(input);
    SearchAsUserPage.submitSearch();
})

Given('He wants to do a search', () => {
    SearchAsUserPage.submitSearch();
})

When('He filters by item', () => {
    SearchAsUserPage.filterByItem();
    SearchAsUserPage.applyFilter();
})

When('He filters by group', () => {
    SearchAsUserPage.filterByGroup();
    SearchAsUserPage.applyFilter();
})

When('He filters by user', () => {
    SearchAsUserPage.filterByUser();
    SearchAsUserPage.applyFilter();
})

When('He filters by item {string}', (type) => {
    SearchAsUserPage.filterByItemType(type);
    SearchAsUserPage.applyFilter();
})

When('He filters by group {string}', (type) => {
    SearchAsUserPage.filterByGroupType(type);
    SearchAsUserPage.applyFilter();
})

Then('He should see only items in the search results', () => {
    SearchAsUserPage.shouldSeeSearchResultPage();
    SearchAsUserPage.shouldSeeItemsList();
    SearchAsUserPage.groupsListShouldNotExist();
    SearchAsUserPage.usersListShouldNotExist();
})

Then('He should see only groups in the search results', () => {
    SearchAsUserPage.shouldSeeSearchResultPage();
    SearchAsUserPage.itemsListShouldNotExist();
    SearchAsUserPage.shouldSeeGroupsList();
    SearchAsUserPage.usersListShouldNotExist();
})

Then('He should see only users in the search results', () => {
    SearchAsUserPage.shouldSeeSearchResultPage();
    SearchAsUserPage.itemsListShouldNotExist();
    SearchAsUserPage.groupsListShouldNotExist();
    SearchAsUserPage.shouldSeeUsersList();
})

Then('He should see only {string} items in the search results', (type) => {
    SearchAsUserPage.shouldSeeSearchResultPage();
    SearchAsUserPage.shouldSeeOnlyItemTypeInResults(type);
})

Then('He should see only {string} groups in the search results', (type) => {
    SearchAsUserPage.shouldSeeSearchResultPage();
    SearchAsUserPage.shouldSeeOnlyGroupTypeInResults(type);
})
