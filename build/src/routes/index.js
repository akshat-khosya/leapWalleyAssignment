"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const content_routes_1 = __importDefault(require("./content.routes"));
const likes_routes_1 = __importDefault(require("./likes.routes"));
function default_1(app) {
    (0, user_routes_1.default)(app);
    (0, content_routes_1.default)(app);
    (0, likes_routes_1.default)(app);
}
exports.default = default_1;
