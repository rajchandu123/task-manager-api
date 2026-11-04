
const request = require("supertest");
const app = require("./app");

describe("ShopEase Application", () => {
    test("GET / should return ShopEase homepage", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain("Welcome to ShopEase!");
    });

    test("GET /health should return healthy status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("healthy");
        expect(response.body.message).toBe("ShopEase is running!");
    });
});
