import { Hono } from "hono";

const messages = new Hono();

// FR-1.2 — get conversation history
messages.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-1.1, FR-1.4 — send a message; streams AI response via SSE
messages.post("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default messages;
