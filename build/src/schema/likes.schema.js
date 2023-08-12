"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalLikesSchema = exports.storeLikesSchema = void 0;
const yup_1 = require("yup");
const storeLikesSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        user_id: (0, yup_1.string)().required("user_id is required"),
        content_id: (0, yup_1.string)().required("content_id is required")
    }),
});
exports.storeLikesSchema = storeLikesSchema;
const totalLikesSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        content_id: (0, yup_1.string)().required("content_id is required")
    }),
});
exports.totalLikesSchema = totalLikesSchema;
