import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { TestHelpers } from "./utils/testHelpers";

const { EMAIL, PASSWORD }: any = process.env;

async function globalSetup(config: FullConfig) {
  TestHelpers.validateEnvironment();

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    httpCredentials: TestHelpers.getHttpCredentials(),
  });

  try {
    const storageStatePath = process.env.STORAGE_STATE_PATH || "storageState.json";
    const loginPage = new LoginPage(page);
    await loginPage.visitLoginPage();
    await loginPage.performLogin(EMAIL, PASSWORD);
    await page.context().storageState({ path: storageStatePath });
  } catch (error) {
    console.error("❌ [GLOBAL-SETUP] Login failed:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;

