import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import dotenv from "dotenv";
import { LOGIN_USERNAME, LOGIN_PASSWORD } from "../config/envs";

dotenv.config();

test.describe("Login Aunados", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.setViewport();
  });

  test("successful login with valid credentials", async () => {
    await loginPage.goto();
    await loginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    await loginPage.expectLoginSuccess();
  });

  test("should display error with invalid credentials", async () => {
    await loginPage.goto();
    await loginPage.login("invalid_user", "wrong_password");
    await loginPage.expectErrorMessageVisible();
  });

  test("should require username field", async () => {
    await loginPage.goto();
    await loginPage.fillPassword(LOGIN_PASSWORD);
    await loginPage.clickEnter();
    await loginPage.expectUsernameInvalid();
  });

  test("should require password field", async () => {
    await loginPage.goto();
    await loginPage.fillUsername(LOGIN_USERNAME);
    await loginPage.clickEnter();
    await loginPage.expectPasswordInvalid();
  });
});
