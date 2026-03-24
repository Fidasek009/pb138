import { Hono } from "hono";

const adminMcp = new Hono();

// FR-2.14 — manage pre-made MCP servers (admin only)
adminMcp.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

adminMcp.post("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

adminMcp.patch("/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

adminMcp.delete("/:serverId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default adminMcp;
