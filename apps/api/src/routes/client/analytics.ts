import { Hono } from "hono";

const analytics = new Hono();

// FR-2.16 — token consumption over time; query params: from, to, granularity
analytics.get("/tokens", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.17 — end-user message count over time
analytics.get("/messages", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default analytics;
