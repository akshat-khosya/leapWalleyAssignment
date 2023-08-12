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
exports.likeCount = exports.createLike = exports.checkLikeStatus = void 0;
const likes_repo_1 = require("../repo/likes.repo");
const checkLikeStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const likeStatus = yield (0, likes_repo_1.findOneLike)(data);
    return likeStatus ? true : false;
});
exports.checkLikeStatus = checkLikeStatus;
const createLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, likes_repo_1.createLikeRepo)(data);
});
exports.createLike = createLike;
const likeCount = (content_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, likes_repo_1.getLikeCount)(content_id);
});
exports.likeCount = likeCount;
