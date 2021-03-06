import request from "supertest";
import createConnection from "../database";
import { getConnection } from "typeorm";
import { app } from "../app";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  }, 90000);

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "User example", email: "user@example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  }, 90000);

  it("should not be able to create a user with exists email", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "User example", email: "user@example.com" });

    expect(response.status).toBe(400);
  }, 90000);
});
