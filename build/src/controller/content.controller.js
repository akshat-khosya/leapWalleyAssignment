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
const content_service_1 = require("../service/content.service");
const user_service_1 = require("../service/user.service");
function contentCreateHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check user
            const user = yield (0, user_service_1.checkUser)(req.body.user_id);
            if (!user) {
                return res.status(404).json({ error: false, msg: "User not found" });
            }
            // create content
            return res.status(200).json({ error: false, content_id: yield (0, content_service_1.contentCreate)(req.body.user_id) });
        }
        catch (error) {
            return res.status(500).json({ error: true, msg: "Server Error " + error });
        }
    });
}
exports.default = contentCreateHandler;
