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
exports.likeCountHandler = exports.storeLikeHandler = exports.stausLikeHandler = void 0;
const user_service_1 = require("../service/user.service");
const content_service_1 = require("../service/content.service");
const likes_service_1 = require("../service/likes.service");
const likes_event_1 = require("../event/likes.event");
const redis_1 = __importDefault(require("../redis/redis"));
const logger_1 = __importDefault(require("../logger"));
function storeLikeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check for user 
            const user = yield (0, user_service_1.checkUser)(req.body.user_id);
            if (!user) {
                return res.status(404).json({ error: false, msg: "User not found" });
            }
            // check for content
            const content = yield (0, content_service_1.checkContent)(req.body.content_id);
            if (!content) {
                return res.status(404).json({ error: false, msg: "Content not found" });
            }
            // check for already like
            // check in redis if already exits
            const checkLikeStatusRedis = yield redis_1.default.getValue(JSON.stringify(req.body));
            if (checkLikeStatusRedis) {
                return res.status(409).json({ error: false, msg: "Content is already liked by user" });
            }
            const likeStatus = yield (0, likes_service_1.checkLikeStatus)(req.body);
            if (likeStatus) {
                return res.status(409).json({ error: false, msg: "Content is already liked by user" });
            }
            // store likes
            yield (0, likes_service_1.createLike)(req.body);
            // update count value 
            const checkLikeCountRedis = yield redis_1.default.getValue(JSON.stringify({ content_id: req.body.content_id }));
            if (checkLikeCountRedis) {
                redis_1.default.setKeyValue(JSON.stringify({ content_id: req.body }), JSON.stringify({ count: JSON.parse(checkLikeCountRedis).count + 1 }), 60);
            }
            // event trigeer for 100 likes
            (0, likes_event_1.hunderedLikes)(req.body.content_id);
            return res.status(200).json({ error: false, msg: "Sucessfull" });
        }
        catch (error) {
            return res.status(500).json({ error: true, msg: "Server Error " + error });
        }
    });
}
exports.storeLikeHandler = storeLikeHandler;
function stausLikeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check for user 
            const user = yield (0, user_service_1.checkUser)(req.body.user_id);
            if (!user) {
                return res.status(404).json({ error: false, msg: "User not found" });
            }
            // check for content
            const content = yield (0, content_service_1.checkContent)(req.body.content_id);
            if (!content) {
                return res.status(404).json({ error: false, msg: "Content not found" });
            }
            // check for already like
            //check for redis
            const checkLikeStatusRedis = yield redis_1.default.getValue(JSON.stringify(req.body));
            if (checkLikeStatusRedis) {
                return res.status(200).json({ error: false, status: true, msg: "Content is  liked by user" });
            }
            const likeStatus = yield (0, likes_service_1.checkLikeStatus)(req.body);
            if (likeStatus) {
                redis_1.default.setKeyValue(JSON.stringify(req.body), JSON.stringify({ status: true }), 60);
                return res.status(200).json({ error: false, status: true, msg: "Content is  liked by user" });
            }
            return res.status(200).json({ error: false, status: false, msg: "Not liked by User" });
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(500).json({ error: true, msg: "Server Error " + error });
        }
    });
}
exports.stausLikeHandler = stausLikeHandler;
function likeCountHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check for content
            const content = yield (0, content_service_1.checkContent)(req.body.content_id);
            if (!content) {
                return res.status(404).json({ error: false, msg: "Content not found" });
            }
            // check in redis
            const checkLikeCountRedis = yield redis_1.default.getValue(JSON.stringify(req.body));
            logger_1.default.info(checkLikeCountRedis);
            if (checkLikeCountRedis) {
                return res.status(200).json({ error: false, count: JSON.parse(checkLikeCountRedis).count });
            }
            const count = yield (0, likes_service_1.likeCount)(req.body.content_id);
            redis_1.default.setKeyValue(JSON.stringify(req.body), JSON.stringify({ count: count }), 60);
            return res.status(200).json({ error: false, count: count });
        }
        catch (error) {
            return res.status(500).json({ error: true, msg: "Server error " + error });
        }
    });
}
exports.likeCountHandler = likeCountHandler;
