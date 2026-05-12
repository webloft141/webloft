import type { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const serverUrl = process.env.CAPACITOR_SERVER_URL;

const config: CapacitorConfig = {
  appId: "com.webloft.app",
  appName: "WEBLOFT",
  webDir: "public",
  bundledWebRuntime: false,
  server: serverUrl
    ? {
        url: serverUrl,
        cleartext: true,
      }
    : undefined,
  plugins: {},
};

export default config;
