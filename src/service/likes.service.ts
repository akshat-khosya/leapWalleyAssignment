import log from "../logger";
import { createLikeRepo, findOneLike, getLikeCount } from "../repo/likes.repo"
interface I_LIKES {
    content_id: string;
    user_id: string;
}
const checkLikeStatus = async (data: I_LIKES) => {
    const likeStatus = await findOneLike(data);

    return likeStatus ? true : false;
}

const createLike = async (data: I_LIKES) => {
    return await createLikeRepo(data);
}

const likeCount = async (content_id: string) => {
    return await getLikeCount(content_id);
}
export { checkLikeStatus, createLike, likeCount };