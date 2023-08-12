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
const user_service_1 = require("../service/user.service");
function userCreateHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({ error: false, user_id: yield (0, user_service_1.userCreate)() });
        }
        catch (error) {
            return res.status(500).json({ error: true, msg: "Server Error " + error });
        }
    });
}
exports.default = userCreateHandler;
