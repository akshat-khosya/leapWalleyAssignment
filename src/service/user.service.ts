import { v4 as uuidv4 } from 'uuid';
import { create, findUserById } from '../repo/user.repo';
import log from '../logger';

const userCreate = async () => {
    // genrate uuid
    const user_id = uuidv4();
    // store in database
    await create({ user_id });
    // return 
    return user_id
}

const checkUser = async (user_id: string) => {
    const user = await findUserById(user_id);
    return user ? true : false;
}
export { userCreate, checkUser };