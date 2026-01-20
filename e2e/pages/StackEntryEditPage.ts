import { FrameLocator, Page } from "@playwright/test";
import { entryEditElements } from "./stack-entry-edit.element";

export class StackEntryEditPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForEntryLoaded() {
    await this.page.waitForLoadState("networkidle");
  }

  async jsonRTEFrame(): Promise<FrameLocator> {
    await this.page.locator(entryEditElements.jsonRTEField).waitFor({ state: "visible" });
    return this.page.frameLocator(entryEditElements.jsonRTEFrame);
  }

  async updateJsonRte(frame: FrameLocator, jsonRte: string) {
    await this.page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) el.scrollIntoView({ block: "center", inline: "nearest" });
    }, entryEditElements.jsonRTEField);

    const jsonRTEEditable = frame.locator(entryEditElements.jsonRTEEditable);
    await jsonRTEEditable.click();
    await frame.locator(entryEditElements.highlightPlugin).first().click();
    await jsonRTEEditable.type(jsonRte);
  }
}

