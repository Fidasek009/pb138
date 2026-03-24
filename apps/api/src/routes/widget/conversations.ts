import { Hono } from "hono";

const conversations = new Hono();

// FR-1.1
conversations.post("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-1.5 — reset / clear conversation
conversations.delete("/:conversationId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-1.6 — submit satisfaction rating
conversations.patch("/:conversationId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default conversations;
