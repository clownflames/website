import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not available to the server. Add it to .env and declare it in cloudflare.config.ts, or upload it with `wrangler secret put DATABASE_URL` before deploying.",
  );
}

if (!/^postgres(ql)?:\/\//.test(connectionString)) {
  throw new Error(
    "DATABASE_URL is not a valid Neon connection string: it must start with postgresql:// and include the user, password and host from the Neon dashboard (use the pooled connection string).",
  );
}

const sql = neon(connectionString);

export const db = drizzle({ client: sql });
