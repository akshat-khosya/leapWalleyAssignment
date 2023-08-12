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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hunderedLikes = void 0;
const logger_1 = __importDefault(require("../logger"));
const content_service_1 = require("../service/content.service");
const likes_service_1 = require("../service/likes.service");
const hunderedLikes = (content_id) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield (0, content_service_1.checkContent)(content_id);
    if (content) {
        const count = yield (0, likes_service_1.likeCount)(content_id);
        if (count === 100) {
            // notification using rabitmq for assignment purpose just console log
            logger_1.default.info(`The content_id ${content_id} got 100 likes notifcation send to user ${content.user_id}`);
        }
        else {
            logger_1.default.info('Not 100 likes');
        }
    }
});
exports.hunderedLikes = hunderedLikes;
