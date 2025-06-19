# As a billing executive
# I want to be able to log in to the billing account
# So that I can manage billing operations

Feature: Login to Billing account

  Background:
    Given the billing account is running
    And the billing executive has valid credentials

  Scenario: Successful login with valid credentials
    When the billing executive enters valid username and password
    Then they should be redirected to the billing dashboard
    And a welcome message should be displayed

  Scenario: Unsuccessful login with invalid credentials
    When the billing executive enters an invalid username or password
    Then an error message should be displayed
    And they should remain on the login page

  # Scenario: Password recovery option available
  #   When the billing executive clicks on "Forgot Password"
  #   Then they should be directed to the password recovery page