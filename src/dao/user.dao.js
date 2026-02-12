import { userModel } from "./models/user.model.js";

export default class UserDAO {
    getByEmail = (email) => userModel.findOne({ email });
    getById = (id) => userModel.findById(id);
    create = (user) => userModel.create(user);
    updatePassword = (id, password) =>
        userModel.updateOne({ _id: id }, { password });
}