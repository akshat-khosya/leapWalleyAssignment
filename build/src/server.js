"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const default_1 = __importDefault(require("./config/default"));
const port = default_1.default.get("port");
const host = default_1.default.get("host");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, () => {
    logger_1.default.info(`Server is listening at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
