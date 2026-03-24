import { Hono } from "hono";

const adminAuth = new Hono();

// FR-3.1
adminAuth.post("/login", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

adminAuth.post("/logout", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default adminAuth;
