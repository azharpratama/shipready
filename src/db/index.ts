import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL || "";
let pool: Pool;

if (databaseUrl) {
  const parsedUrl = new URL(databaseUrl);
  const hasSslmode = parsedUrl.searchParams.has("sslmode");
  parsedUrl.searchParams.delete("sslmode");

  pool = new Pool({
    connectionString: parsedUrl.toString(),
    ssl: hasSslmode ? { rejectUnauthorized: false } : undefined,
  });
} else {
  pool = new Pool();
}

export const db = drizzle(pool, { schema });
