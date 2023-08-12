import { Request, Response } from "express";
import { userCreate } from "../service/user.service";

export default async function userCreateHandler(req: Request, res: Response) {
    try {
        return res.status(200).json({ error: false, user_id: await userCreate() });
    } catch (error) {
        return res.status(500).json({ error: true, msg: "Server Error " + error })
    }

}