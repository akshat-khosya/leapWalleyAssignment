import { Request, Response } from "express";
import { checkUser } from "../service/user.service";
import { checkContent } from "../service/content.service";
import { checkLikeStatus, createLike, likeCount } from "../service/likes.service";
import { error } from "console";
import { hunderedLikes } from "../event/likes.event";
import redisInstance from "../redis/redis";
import log from "../logger";


async function storeLikeHandler(req: Request, res: Response) {
    try {
        // check for user 
        const user = await checkUser(req.body.user_id);
        if (!user) {
            return res.status(404).json({ error: false, msg: "User not found" });
        }
        // check for content
        const content = await checkContent(req.body.content_id);
        if (!content) {
            return res.status(404).json({ error: false, msg: "Content not found" });
        }

        // check for already like
        // check in redis if already exits
        const checkLikeStatusRedis = await redisInstance.getValue(JSON.stringify(req.body));
        if (checkLikeStatusRedis) {
            return res.status(409).json({ error: false, msg: "Content is already liked by user" });
        }
        const likeStatus = await checkLikeStatus(req.body);

        if (likeStatus) {
            return res.status(409).json({ error: false, msg: "Content is already liked by user" });
        }
        // store likes
        await createLike(req.body);
        // update count value 
        const checkLikeCountRedis = await redisInstance.getValue(JSON.stringify({ content_id: req.body.content_id }));
        if (checkLikeCountRedis) {
            redisInstance.setKeyValue(JSON.stringify({ content_id: req.body }), JSON.stringify({ count: JSON.parse(checkLikeCountRedis).count + 1 }), 60)
        }
        // event trigeer for 100 likes
        hunderedLikes(req.body.content_id);
        return res.status(200).json({ error: false, msg: "Sucessfull" });
    } catch (error) {
        return res.status(500).json({ error: true, msg: "Server Error " + error })
    }

}

async function stausLikeHandler(req: Request, res: Response) {
    try {
        // check for user 
        const user = await checkUser(req.body.user_id);
        if (!user) {
            return res.status(404).json({ error: false, msg: "User not found" });
        }
        // check for content
        const content = await checkContent(req.body.content_id);
        if (!content) {
            return res.status(404).json({ error: false, msg: "Content not found" });
        }
        // check for already like
        //check for redis
        const checkLikeStatusRedis = await redisInstance.getValue(JSON.stringify(req.body));
        if (checkLikeStatusRedis) {
            return res.status(200).json({ error: false, status: true, msg: "Content is  liked by user" });
        }
        const likeStatus = await checkLikeStatus(req.body);

        if (likeStatus) {
            redisInstance.setKeyValue(JSON.stringify(req.body), JSON.stringify({ status: true }), 60)
            return res.status(200).json({ error: false, status: true, msg: "Content is  liked by user" });
        }
        return res.status(200).json({ error: false, status: false, msg: "Not liked by User" });
    } catch (error) {
        log.error(error);
        return res.status(500).json({ error: true, msg: "Server Error " + error })
    }

}

async function likeCountHandler(req: Request, res: Response) {
    try {
        // check for content
        const content = await checkContent(req.body.content_id);
        if (!content) {
            return res.status(404).json({ error: false, msg: "Content not found" });
        }
        // check in redis
        const checkLikeCountRedis = await redisInstance.getValue(JSON.stringify(req.body));
        log.info(checkLikeCountRedis);
        if (checkLikeCountRedis) {
            return res.status(200).json({ error: false, count: JSON.parse(checkLikeCountRedis).count });
        }
        const count = await likeCount(req.body.content_id);
        redisInstance.setKeyValue(JSON.stringify(req.body), JSON.stringify({ count: count }), 60)
        return res.status(200).json({ error: false, count: count });
    } catch (error) {
        return res.status(500).json({ error: true, msg: "Server error " + error });
    }
}
export { stausLikeHandler, storeLikeHandler, likeCountHandler };
