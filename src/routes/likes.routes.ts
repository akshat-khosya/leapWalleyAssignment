import { Express } from "express";
import { validateRequest } from "../middleware";
import { storeLikesSchema, totalLikesSchema } from "../schema/likes.schema";
import { likeCountHandler, stausLikeHandler, storeLikeHandler } from "../controller/likes.controller";


export default function (app: Express) {
    app.post("/api/likes/store", [validateRequest(storeLikesSchema)], storeLikeHandler);
    app.post("/api/likes/status", [validateRequest(storeLikesSchema)], stausLikeHandler);
    app.post("/api/likes/count", [validateRequest(totalLikesSchema)], likeCountHandler);
}
