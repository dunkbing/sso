import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../db/schema";
import { getAuthOptions, type AuthEnv } from "./auth-options";

export const auth = (env: AuthEnv) => {
  const client = postgres(env.DATABASE_URL);
  const db = drizzle(client, { schema });

  return betterAuth({
    ...getAuthOptions(env),
    database: drizzleAdapter(db, { provider: "pg" }),
  });
};
