import {
	boolean,
	numeric,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	balanceUsd: numeric("balance_usd", { precision: 12, scale: 4 })
		.notNull()
		.default("0"),
	monthlyUsageLimit: numeric("monthly_usage_limit", {
		precision: 12,
		scale: 4,
	}),
	lastActive: timestamp("last_active", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const botConfigs = pgTable("bot_configs", {
	id: uuid("id").primaryKey().defaultRandom(),
	clientId: uuid("client_id")
		.notNull()
		.unique()
		.references(() => clients.id, { onDelete: "cascade" }),
	systemPrompt: text("system_prompt"),
	defaultRole: varchar("default_role", { length: 255 }),
	toneStyle: varchar("tone_style", { length: 255 }),
	internetSearchEnabled: boolean("internet_search_enabled")
		.notNull()
		.default(false),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
