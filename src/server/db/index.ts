import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

// For edge runtime - gets binding from global env
export function getDb(d1?: D1Database) {
  const database = d1 ?? (process.env.DATABASE as unknown as D1Database);
  return drizzle(database, { schema, logger: true });
}

// Keep a default export for places that can't pass the binding
export const db = getDb();