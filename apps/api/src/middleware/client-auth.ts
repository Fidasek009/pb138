import type { MiddlewareHandler } from "hono";

// Validates Client JWT from Authorization: Bearer <token>
// Also accepts impersonation JWTs issued by POST /admin/clients/:id/impersonate (FR-3.3)
export const clientAuth: MiddlewareHandler = async (_c, next) => {
	// TODO: verify JWT, set c.set("clientId", ...) on context
	await next();
};
