import { Hono } from "hono";

const botConfig = new Hono();

// FR-2.9–2.13
botConfig.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.9–2.13
botConfig.patch("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default botConfig;
