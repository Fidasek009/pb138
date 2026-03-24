import type { MiddlewareHandler } from "hono";

// Validates Admin JWT from Authorization: Bearer <token>
// Logs every mutating action to admin_access_logs (NFR-3.4)
export const adminAuth: MiddlewareHandler = async (_c, next) => {
	// TODO: verify admin JWT, set c.set("adminId", ...) on context
	await next();
};
