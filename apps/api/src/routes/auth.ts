import { Hono } from "hono";

const auth = new Hono();

// FR-2.1
auth.post("/register", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.2
auth.post("/login", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.2
auth.post("/logout", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default auth;
