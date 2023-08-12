import { Express } from "express";
import userRoutes from "./user.routes";
import contentRoutes from "./content.routes";
import likesRoutes from "./likes.routes";
export default function (app: Express) {
    userRoutes(app);
    contentRoutes(app);
    likesRoutes(app);
}