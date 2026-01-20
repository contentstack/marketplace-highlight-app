import { Page } from "@playwright/test";

export class StackEntriesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToStackEntries(stackApiKey: string) {
    await this.page.goto(`/#!/stack/${stackApiKey}/entries`);
    await this.page.waitForLoadState();
  }

  async openEntryEdit(entryName: string) {
    await this.page.getByText(entryName).first().click();
    await this.page.waitForLoadState();
  }
}

