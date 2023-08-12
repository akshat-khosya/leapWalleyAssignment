import { Content } from "../model/content.model";



const createContentRepo = async (data: { content_id: string, user_id: string }) => {
    return Content.create(data);
}
const findContentById = async (content_id: string) => {
    return await Content.findOne({ where: { content_id: content_id } });
}
export { createContentRepo, findContentById };