import { Hono } from "hono";

const blacklist = new Hono();

// FR-2.12
blacklist.get("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.12
blacklist.post("/", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

// FR-2.12
blacklist.delete("/:wordId", async (c) => {
	return c.json({ message: "Not implemented" }, 501);
});

export default blacklist;
