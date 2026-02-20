import { describe, expect, test } from "bun:test";
import { get } from "./hello";

describe("get", () => {
	test("should combine string with parameter value", async () => {
		const resp = await get({ name: "world" });
		expect(resp.message).toBe("Hello world!");
	});
});
