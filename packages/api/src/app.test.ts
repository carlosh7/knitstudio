import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("API", () => {
  it("health endpoint returns ok", async () => {
    const app = createApp();
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.version).toBe("1.0.0");
  });
});
