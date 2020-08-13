Feature: Register to Application

    This test verifies the success when registering a new user

    Scenario: register into the application
        Given The user opens landing page
        When He fills the registration form with "@Galo2113" as password
        Then He should see the notification of success
