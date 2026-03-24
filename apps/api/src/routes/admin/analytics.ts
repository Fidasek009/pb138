import { Hono } from "hono";

const adminAnalytics = new Hono();

// FR-3.5 — platform-wide usage aggregates (total tokens, active tenants, error rates)
adminAnalytics.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default adminAnalytics;
