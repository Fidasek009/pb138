import { Hono } from "hono";

const sessions = new Hono();

// FR-1.1 — create or resume a session; body: { browserSessionId }
sessions.post("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default sessions;
