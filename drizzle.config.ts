import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

function getEnvUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const envFiles = [".env.production.local", ".env.production", ".env.local", ".env"];

  for (const file of envFiles) {
    try {
      const envPath = path.resolve(process.cwd(), file);
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
        if (match?.[1]) return match[1];
      }
    } catch {
      // ignore read error
    }
  }

  return "";
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getEnvUrl(),
  },
});
