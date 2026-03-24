/// <reference types="bun-types" />
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema/index.ts",
	out: "./drizzle/migrations",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: drizzle-kit requires a string, fail-fast check is in src/db/index.ts
		url: process.env.DATABASE_URL!,
	},
	verbose: true,
	strict: true,
});
