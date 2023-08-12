import log from "../logger";
import { v4 as uuidv4 } from 'uuid';
import { Likes } from "../model/likes.model";


const findOneLike = async (data: {
    user_id: string,
    content_id: string;
}) => {
    try {
        const result = await Likes.findOne({ where: data });
        return result;
    } catch (error) {
        return false;
    }

}
const createLikeRepo = async (data: {
    user_id: string,
    content_id: string;
}) => {
    return await Likes.create({ ...data, id: uuidv4() });
}

const getLikeCount = async (content_id: string) => {
    return await Likes.count({ where: { content_id: content_id } });
}

export { findOneLike, createLikeRepo, getLikeCount };