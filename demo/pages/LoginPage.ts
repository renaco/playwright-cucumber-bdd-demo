import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly enterButton: Locator;
  readonly errorMessage: Locator;
  readonly userNameDisplay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(
      "[data-testid='loginForm_username_input']"
    );
    this.passwordInput = page.locator(
      "[data-testid='loginForm_password_input']"
    );
    this.enterButton = page.locator("[data-testid='loginForm_enter_button']");
    this.errorMessage = page.locator("[data-testid='loginForm_error_message']");
    this.userNameDisplay = page.locator(
      ".vds-header__user-name[data-testid='default_text']"
    );
  }

  async goto(url?: string) {
    const targetUrl = url ?? process.env.LOGIN_URL ?? "";
    await this.page.goto(targetUrl);
  }

  async setViewport(width = 1426, height = 1095) {
    await this.page.setViewportSize({ width, height });
  }

  async fillUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickEnter() {
    await this.enterButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickEnter();
  }

  async expectLoginSuccess() {
    await expect(this.page).not.toHaveURL(/login/);
  }

  async expectErrorMessageVisible(timeout = 5000) {
    await expect(this.errorMessage).toBeVisible({ timeout });
  }

  async expectUsernameInvalid() {
    await expect(this.usernameInput).toHaveAttribute("aria-invalid", "true");
  }

  async expectPasswordInvalid() {
    await expect(this.passwordInput).toHaveAttribute("aria-invalid", "true");
  }

  async expectDashboardVisible(expectedUserName: string, timeout = 10000) {
    await expect(this.userNameDisplay).toHaveText(expectedUserName, {
      timeout,
    });
  }
}
