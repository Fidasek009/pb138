import { describe, expect, it } from "bun:test";
import app from "./index";

describe("GET /health", () => {
	it("returns OK", async () => {
		const res = await app.fetch(new Request("http://localhost/health"));
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body).toEqual({ message: "OK", success: true });
	});
});
