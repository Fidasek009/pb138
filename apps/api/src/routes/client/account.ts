import { Hono } from "hono";

const account = new Hono();

// FR-2.2
account.get("/me", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.2
account.patch("/me", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.2
account.patch("/me/password", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.6
account.post("/me/balance", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.7
account.patch("/me/usage-limit", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.8
account.patch("/me/usage-alert", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default account;
