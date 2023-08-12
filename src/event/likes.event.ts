import log from "../logger";
import { checkContent } from "../service/content.service";
import { likeCount } from "../service/likes.service"

const hunderedLikes = async (content_id: string) => {
    const content = await checkContent(content_id);
    if (content) {
        const count = await likeCount(content_id);
        if (count === 100) {
            // notification using rabitmq for assignment purpose just console log
            log.info(`The content_id ${content_id} got 100 likes notifcation send to user ${content.user_id}`)
        } else {
            log.info('Not 100 likes');
        }
    }

}

export { hunderedLikes };