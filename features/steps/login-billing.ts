import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let page: any;

setDefaultTimeout(10 * 1000); // 10 seconds

Given("the billing account is running", async function () {
  page = this.page;
  await page.setViewportSize({ width: 1079, height: 923 });
  await page.goto(process.env.LOGIN_URL!);
});

Given("the billing executive has valid credentials", async function () {
  // This step can be used to set context, if needed
  this.credentials = {
    username: process.env.LOGIN_USERNAME!,
    password: process.env.LOGIN_PASSWORD!,
  };
});

When(
  "the billing executive enters valid username and password",
  async function () {
    await this.page.locator("[data-testid='loginForm_username_input']").click();

    await this.page
      .locator("[data-testid='loginForm_username_input']")
      .type(process.env.LOGIN_USERNAME!);

    await this.page
      .locator("[data-testid='loginForm_password_input']")
      .type(process.env.LOGIN_PASSWORD!);
    await this.page.locator("[data-testid='loginForm_enter_button']").click();
  }
);

Then(
  "they should be redirected to the billing dashboard",
  { timeout: 20_000 },
  async function () {
    await expect(
      this.page.locator(".vds-header__user-name[data-testid='default_text']")
    ).toHaveText("ytalo javier fernandez sarmiento", { timeout: 20000 });
  }
);

Then("a welcome message should be displayed", async function () {
  await page.locator("[data-testid='default_sidenavSlide_button']").click();
  await expect(
    this.page.locator("[data-testid='default_sidenavSubtitle_text']")
  ).toHaveText("YTALO JAVIER");
});

When(
  "the billing executive enters an invalid username or password",
  async function () {
    await page
      .locator("[data-testid='loginForm_username_input']")
      .type("wronguser");

    await page
      .locator("[data-testid='loginForm_password_input']")
      .type("wrongpass");

    await page.locator("[data-testid='loginForm_enter_button'] > span").click();
  }
);

Then("an error message should be displayed", async function () {
  await expect(
    this.page.locator('[data-testid="login_error_modalContainer"]', {
      timeout: 20000,
    })
  ).toBeVisible();
  await expect(
    this.page.locator('[data-testid="login_error_modalTitle"]')
  ).toHaveText("El usuario o la contraseña que ingresaste son incorrectos");
});

Then("they should remain on the login page", async function () {
  await expect(this.page).toHaveURL(process.env.LOGIN_URL!);
});
