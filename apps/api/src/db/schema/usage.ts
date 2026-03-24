import {
	integer,
	numeric,
	pgTable,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { clients } from "./client";

export const usageRecords = pgTable("usage_records", {
	id: uuid("id").primaryKey().defaultRandom(),
	clientId: uuid("client_id")
		.notNull()
		.references(() => clients.id, { onDelete: "cascade" }),
	tokensUsed: integer("tokens_used").notNull(),
	costUsd: numeric("cost_usd", { precision: 12, scale: 6 }).notNull(),
	recordedAt: timestamp("recorded_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
