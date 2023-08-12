import * as request from "supertest";
import express from "express";
import { likeCountHandler, stausLikeHandler, storeLikeHandler } from "../src/controller/likes.controller";
import { userCreate } from "../src/service/user.service";
import connect from "../src/db/connect";

const app = express();

app.use(express.json());
connect();
app.post("/store-like", storeLikeHandler);
app.post("/status", stausLikeHandler)
app.post("/count", likeCountHandler)
describe("Functional Tests for likes", () => {

    it("should successfully like content", async () => {

        const user_id = await userCreate();
        const response = await request.default(app)
            .post("/store-like")
            .send({
                user_id: user_id,
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd41763"
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ error: false, msg: "Sucessfull" });
    });

    it("should return 409 if content is already liked by user", async () => {
        const response = await request.default(app)
            .post("/store-like")
            .send({
                user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd41763"
            });
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: false, msg: "Content is already liked by user" });
    });

    it("should return 404 if user is not found", async () => {
        const response = await request.default(app)
            .post("/store-like")
            .send({
                user_id: "a38a067e-5b19-4920-910b-94a3574b26",
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd417"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "User not found" });
    });

    it("should return 404 if content is not found", async () => {
        const response = await request.default(app)
            .post("/store-like")
            .send({
                user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    });

});

describe("Functional Tests for like status", () => {
    connect();
    it("status of liked content", async () => {

        const response = await request.default(app)
            .post("/status")
            .send({
                user_id: "b86d2d2f-520f-4a9e-928b-af048ac2d397",
                content_id: "cadcc5b9-1828-4218-abc1-62b3e73e6884"
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ error: false, status: true, msg: "Content is  liked by user" });
    });


    it("should return 404 if user is not found", async () => {
        const response = await request.default(app)
            .post("/status")
            .send({
                user_id: "a38a067e-5b19-4920-910b-94a3574b26",
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd417"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "User not found" });
    });

    it("should return 404 if content is not found", async () => {
        const response = await request.default(app)
            .post("/status")
            .send({
                user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    });

});

describe("Functional Tests for content count", () => {
    connect();
    it("content count", async () => {

        const response = await request.default(app)
            .post("/count")
            .send({
                content_id: "cadcc5b9-1828-4218-abc1-62b3e73e6884"
            });
        expect(response.status).toBe(200);
        expect(response.body.count).toBeGreaterThanOrEqual(0);
        expect(response.body.error).toBe(false);

    });

    it("should return 404 if content is not found", async () => {
        const response = await request.default(app)
            .post("/count")
            .send({
                content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    });

});
