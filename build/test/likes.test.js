"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("supertest"));
const express_1 = __importDefault(require("express"));
const likes_controller_1 = require("../src/controller/likes.controller");
const user_service_1 = require("../src/service/user.service");
const connect_1 = __importDefault(require("../src/db/connect"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connect_1.default)();
app.post("/store-like", likes_controller_1.storeLikeHandler);
app.post("/status", likes_controller_1.stausLikeHandler);
app.post("/count", likes_controller_1.likeCountHandler);
describe("Functional Tests for likes", () => {
    it("should successfully like content", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_id = yield (0, user_service_1.userCreate)();
        const response = yield request.default(app)
            .post("/store-like")
            .send({
            user_id: user_id,
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd41763"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ error: false, msg: "Sucessfull" });
    }));
    it("should return 409 if content is already liked by user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/store-like")
            .send({
            user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd41763"
        });
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: false, msg: "Content is already liked by user" });
    }));
    it("should return 404 if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/store-like")
            .send({
            user_id: "a38a067e-5b19-4920-910b-94a3574b26",
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd417"
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "User not found" });
    }));
    it("should return 404 if content is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/store-like")
            .send({
            user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    }));
});
describe("Functional Tests for like status", () => {
    (0, connect_1.default)();
    it("status of liked content", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/status")
            .send({
            user_id: "b86d2d2f-520f-4a9e-928b-af048ac2d397",
            content_id: "cadcc5b9-1828-4218-abc1-62b3e73e6884"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ error: false, status: true, msg: "Content is  liked by user" });
    }));
    it("should return 404 if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/status")
            .send({
            user_id: "a38a067e-5b19-4920-910b-94a3574b26",
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd417"
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "User not found" });
    }));
    it("should return 404 if content is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/status")
            .send({
            user_id: "a38a067e-5b19-4920-910b-94a3574b26e6",
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    }));
});
describe("Functional Tests for content count", () => {
    (0, connect_1.default)();
    it("content count", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/count")
            .send({
            content_id: "cadcc5b9-1828-4218-abc1-62b3e73e6884"
        });
        expect(response.status).toBe(200);
        expect(response.body.count).toBeGreaterThanOrEqual(0);
        expect(response.body.error).toBe(false);
    }));
    it("should return 404 if content is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.default(app)
            .post("/count")
            .send({
            content_id: "0d7fbea3-8ad3-4590-a015-55466fd41"
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: false, msg: "Content not found" });
    }));
});
