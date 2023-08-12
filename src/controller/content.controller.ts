import { Request, Response } from "express";
import { contentCreate } from "../service/content.service";
import { checkUser } from "../service/user.service";


export default async function contentCreateHandler(req: Request, res: Response) {
    try {
        // check user
        const user = await checkUser(req.body.user_id);

        if (!user) {
            return res.status(404).json({ error: false, msg: "User not found" });
        }
        // create content

        return res.status(200).json({ error: false, content_id: await contentCreate(req.body.user_id) });
    } catch (error) {
        return res.status(500).json({ error: true, msg: "Server Error " + error })
    }



}