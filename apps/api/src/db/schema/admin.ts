import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./client";

export const adminUsers = pgTable("admin_users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const adminAccessLogs = pgTable("admin_access_logs", {
	id: uuid("id").primaryKey().defaultRandom(),
	adminId: uuid("admin_id")
		.notNull()
		.references(() => adminUsers.id, { onDelete: "cascade" }),
	clientId: uuid("client_id")
		.notNull()
		.references(() => clients.id, { onDelete: "cascade" }),
	actionType: varchar("action_type", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
