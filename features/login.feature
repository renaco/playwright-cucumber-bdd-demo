Feature: Login
  Scenario: Successful login
    Given the user is on login
    When they submit valid credentials
    Then they see the dashboard

