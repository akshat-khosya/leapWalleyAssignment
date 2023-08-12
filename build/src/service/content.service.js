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
exports.checkContent = exports.contentCreate = void 0;
const uuid_1 = require("uuid");
const content_repo_1 = require("../repo/content.repo");
const contentCreate = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // genrate uuid
    const content_id = (0, uuid_1.v4)();
    // store in database
    yield (0, content_repo_1.createContentRepo)({ content_id, user_id });
    // return 
    return content_id;
});
exports.contentCreate = contentCreate;
const checkContent = (content_id) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield (0, content_repo_1.findContentById)(content_id);
    return content ? content : false;
});
exports.checkContent = checkContent;
