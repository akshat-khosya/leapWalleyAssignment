import { User } from "../model/user.model";


const create = async (data: { user_id: string }) => {
    return await User.create(data);

}

const findUserById = async (user_id: string) => {
    return await User.findOne({ where: { user_id: user_id } });
}
export { create, findUserById };