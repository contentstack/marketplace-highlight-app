import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly venusPasswordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.venusPasswordInput = page.locator("input[name='password']");
    this.loginButton = page.locator('button:has-text("Log In"), button:has-text("LOGIN")');
  }

  async visitLoginPage() {
    if (process.env.ENV_URL) {
      await this.page.goto(`${process.env.ENV_URL}#!/login`);
    }
  }

  async performLogin(email: string, password: string) {
    try {
      if ((await this.page.$(".user-session-page")) !== null) {
        await this.emailInput.type(email);
        await this.passwordInput.type(password);
        await this.loginButton.click();

        if (process.env.ORG_ID) {
          await this.page.click(".user-name");
          await this.page.click("text=New Interface");
          await this.page.click(".OrgDropdown");
          await this.page.click(`#${process.env.ORG_ID}`);
        }

        await this.page.waitForTimeout(2000);
      } else {
        await this.emailInput.type(email);
        await this.venusPasswordInput.type(password);
        const venusLoginButton = await this.page.waitForSelector('button:has-text("Log In")');
        await venusLoginButton.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

