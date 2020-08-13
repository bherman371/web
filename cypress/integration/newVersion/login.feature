Feature: Login to Application

    This test verifies if a valid user can successfully access the application

    # Scenario: Invalid user
    #     Given I open landing page
    #     When I fill username with "invalid username"
    #     And I fill password with "invalid password"
    #     And I click on submit login
    #     Then I should see error message

    Scenario: Valid user
        Given The user opens landing page
        When He fills the login form with "zeddemore" as email and "@Galo2113" as password
        Then He should see the news feed
