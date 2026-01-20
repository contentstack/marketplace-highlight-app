import { BrowserContext, expect, Page, test } from "@playwright/test";
import { StackEntriesPage } from "./pages/StackEntriesPage";
import { StackEntryEditPage } from "./pages/StackEntryEditPage";
import { entryEditElements } from "./pages/stack-entry-edit.element";
import { TestHelpers } from "./utils/testHelpers";

let stackEntries: StackEntriesPage;
let stackEntryEdit: StackEntryEditPage;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  TestHelpers.validateEnvironment();

  const storageStatePath = "storageState.json";
  context = await browser.newContext({
    storageState: storageStatePath,
    httpCredentials: {
      username: process.env.RTE_PLUGIN_USERNAME as string,
      password: process.env.RTE_PLUGIN_PASSWORD as string,
    },
  });

  page = await context.newPage();
  stackEntries = new StackEntriesPage(page);
  stackEntryEdit = new StackEntryEditPage(page);

  const entryTitle = 'highlight-test';
  await stackEntries.navigateToStackEntries(process.env.STACK_API_KEY as string);
  await stackEntries.openEntryEdit(entryTitle);
  await stackEntryEdit.waitForEntryLoaded();
});

test.afterAll(async () => {
  await context.close();
  await page.close();
});

test("should show highlight plugin, highlight the text, and highlight class should be applied", async () => {
  const frame = await stackEntryEdit.jsonRTEFrame();
  await stackEntryEdit.updateJsonRte(frame, "Hello");
  await expect(frame.locator(entryEditElements.highlightSpan)).toBeVisible();
});

