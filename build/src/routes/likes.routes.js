"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const likes_schema_1 = require("../schema/likes.schema");
const likes_controller_1 = require("../controller/likes.controller");
function default_1(app) {
    app.post("/api/likes/store", [(0, middleware_1.validateRequest)(likes_schema_1.storeLikesSchema)], likes_controller_1.storeLikeHandler);
    app.post("/api/likes/status", [(0, middleware_1.validateRequest)(likes_schema_1.storeLikesSchema)], likes_controller_1.stausLikeHandler);
    app.post("/api/likes/count", [(0, middleware_1.validateRequest)(likes_schema_1.totalLikesSchema)], likes_controller_1.likeCountHandler);
}
exports.default = default_1;
