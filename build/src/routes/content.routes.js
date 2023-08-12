"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const content_schema_1 = require("../schema/content.schema");
const content_controller_1 = __importDefault(require("../controller/content.controller"));
function default_1(app) {
    app.post("/api/content/create", [(0, middleware_1.validateRequest)(content_schema_1.createContentSchema)], content_controller_1.default);
}
exports.default = default_1;
