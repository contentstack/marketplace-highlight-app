type HttpCredentials = { username: string; password: string } | undefined;
import dotenv from "dotenv";

export class TestHelpers {
  static validateEnvironment(): void {
    const requiredEnvVars = ["ENV_URL", "EMAIL", "PASSWORD", "RTE_PLUGIN_USERNAME", "RTE_PLUGIN_PASSWORD"];
    const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
      console.error("❌ [ENV] Missing required environment variables:", missing);
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    if (!process.env.STACK_DASHBOARD_URL && !process.env.STACK_API_KEY) {
      throw new Error("Missing STACK_DASHBOARD_URL or STACK_API_KEY");
    }
  }

  static getStackDashboardUrl(): string {
    if (process.env.ENV_URL) {
      return `${process.env.ENV_URL}/#!/stack/${process.env.STACK_API_KEY}/dashboard`;
    }

    const apiKey = process.env.STACK_API_KEY;
    const envUrl = process.env.ENV_URL;
    if (!apiKey || !envUrl) {
      throw new Error("STACK_API_KEY and ENV_URL are required to build dashboard URL");
    }
    return `${envUrl}/#!/stack/${apiKey}/dashboard`;
  }

  static getHttpCredentials(): HttpCredentials {
    const username = process.env.BASIC_AUTH_USERNAME;
    const password = process.env.BASIC_AUTH_PASSWORD;
    if (!username || !password) return undefined;
    return { username, password };
  }
}

