const response = require("supertest");
const app = require("../../app");

describe("Test GET /routes", () => {
  test("It should return 200 success", async () => {
    const resp = await response(app).get("/planets/").expect(200);
  });
});

describe("ONYUMA JOHN", () => {
  test("Testing Onyuma John", () => {
    const resp = 500;
    expect(resp).toBe(500);
  });
});
