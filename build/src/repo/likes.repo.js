"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikeCount = exports.createLikeRepo = exports.findOneLike = void 0;
const uuid_1 = require("uuid");
const likes_model_1 = require("../model/likes.model");
const findOneLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield likes_model_1.Likes.findOne({ where: data });
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.findOneLike = findOneLike;
const createLikeRepo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield likes_model_1.Likes.create(Object.assign(Object.assign({}, data), { id: (0, uuid_1.v4)() }));
});
exports.createLikeRepo = createLikeRepo;
const getLikeCount = (content_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield likes_model_1.Likes.count({ where: { content_id: content_id } });
});
exports.getLikeCount = getLikeCount;
