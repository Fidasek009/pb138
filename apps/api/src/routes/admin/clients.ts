import { Hono } from "hono";

const adminClients = new Hono();

// FR-3.1 — list all clients with status indicators
adminClients.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-3.1
adminClients.get("/:clientId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-3.2 — suspend or re-enable; body: { status: "active" | "suspended" }
adminClients.patch("/:clientId/status", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-3.3 — issue short-lived impersonation JWT
adminClients.post("/:clientId/impersonate", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default adminClients;
