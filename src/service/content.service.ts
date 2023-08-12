import { v4 as uuidv4 } from 'uuid';
import { createContentRepo, findContentById } from '../repo/content.repo';
import log from '../logger';


const contentCreate = async (user_id: string) => {
    // genrate uuid
    const content_id = uuidv4();
    // store in database
    await createContentRepo({ content_id, user_id });
    // return 
    return content_id
}
const checkContent = async (content_id: string) => {
    const content = await findContentById(content_id);
    return content ? content : false;
}
export { contentCreate, checkContent };