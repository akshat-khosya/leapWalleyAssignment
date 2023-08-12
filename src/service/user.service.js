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
exports.checkUser = exports.userCreate = void 0;
const uuid_1 = require("uuid");
const user_repo_1 = require("../repo/user.repo");
const userCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    // genrate uuid
    const user_id = (0, uuid_1.v4)();
    // store in database
    yield (0, user_repo_1.create)({ user_id });
    // return 
    return user_id;
});
exports.userCreate = userCreate;
const checkUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repo_1.findUserById)(user_id);
    return user ? true : false;
});
exports.checkUser = checkUser;
