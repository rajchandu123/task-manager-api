const request = require("supertest");
const app = require("./app");

describe("Task Manager API", () => {

    test("GET / should return API running message", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Task Manager API is running!");
    });

    test("GET /tasks should return tasks", async () => {

        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);

        expect(response.body.length)
            .toBeGreaterThan(0);
    });

});