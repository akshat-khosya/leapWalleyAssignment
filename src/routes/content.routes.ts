import { Express } from "express";
import { validateRequest } from "../middleware";
import { createContentSchema } from "../schema/content.schema";
import contentCreateHandler from "../controller/content.controller";
export default function (app: Express) {
    app.post("/api/content/create", [validateRequest(createContentSchema)], contentCreateHandler);
}