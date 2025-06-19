import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// Step definition for navigating to the login page
Given("the user is on login", async function () {
  await this.page.setViewportSize({ width: 1161, height: 922 });
  await this.page.goto(process.env.LOGIN_URL!);
});

// Step definition for submitting valid credentials
When("they submit valid credentials", async function () {
  await this.page
    .locator("[data-testid='loginForm_username_input']")
    .type(process.env.LOGIN_USERNAME!);
  await this.page
    .locator("[data-testid='loginForm_password_input']")
    .type(process.env.LOGIN_PASSWORD!);
  await this.page
    .locator("[data-testid='loginForm_enter_button'] > span")
    .click();
});

// Step definition for verifying the dashboard is displayed
Then("they see the dashboard", async function () {
  // Adjust expectations depending on actual dashboard elements
  await expect(
    this.page.locator(".vds-header__user-name[data-testid='default_text']")
  ).toHaveText("juan condori", { timeout: 10000 });
});
