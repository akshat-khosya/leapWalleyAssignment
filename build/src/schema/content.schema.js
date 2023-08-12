"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentSchema = void 0;
const yup_1 = require("yup");
const createContentSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        user_id: (0, yup_1.string)().required("user_id is required"),
    }),
});
exports.createContentSchema = createContentSchema;
