Feature: Searching and filtering search results for a visitor

   This test verifies that the search and filters are working correctly for a visitor

    Background: 
        Given The visitor accesses the website
        And He wants to do a search

    Scenario: Searching and filtering by item
        When He filters by item
        Then He should see only items in the search results

    Scenario Outline: Searching Item and filtering by item types
        When He filters by item
        And He filters by item "<type>"
        Then He should see only "<type>" items in the search results

    Examples:
    | type    |
    | give    |
    | receive |
    | lend    |
    | borrow  |

    Scenario: Searching and filtering by group
        When He filters by group
        Then He should see only groups in the search results

    # Scenario Outline: Searching Group and filtering by group types
    #     When He filters by group
    #     And He filters by group "<type>"
    #     Then He should see only "<type>" groups in the search results

    # Examples:
    # | type    |
    # | public  |
    # | private |

    Scenario: Searching and filtering by user
        When He filters by user
        Then He should see only users in the search results
