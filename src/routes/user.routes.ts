import { Express } from "express";
import userCreateHandler from "../controller/user.controller";
export default function (app: Express) {
    app.get("/api/user/create", userCreateHandler);
}