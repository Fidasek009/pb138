import { Hono } from "hono";

const mcp = new Hono();

// FR-2.14 — pre-made MCP servers
mcp.get("/pre-made", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.get("/pre-made/enabled", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.post("/pre-made/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.delete("/pre-made/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.15 — custom MCP servers
mcp.get("/custom", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.post("/custom", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.patch("/custom/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

mcp.delete("/custom/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default mcp;
