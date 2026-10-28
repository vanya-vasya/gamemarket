import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Database = NeonHttpDatabase<typeof schema>;

let database: Database | undefined;

function connect(): Database {
  if (database) return database;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to the Vercel project environment.",
    );
  }
  database = drizzle(neon(url), { schema });
  return database;
}

// Connect on first query, not at import. `next build` loads route modules
// while collecting page data, and that must succeed before env is present.
export const db: Database = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const real = connect();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export * from "./schema";
