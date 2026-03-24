import type { MiddlewareHandler } from "hono";

// Validates X-Widget-Token header against clients.widget_token (NFR-3.2)
export const widgetAuth: MiddlewareHandler = async (_c, next) => {
	// TODO: look up widget token in DB, set c.set("clientId", ...) on context
	await next();
};
