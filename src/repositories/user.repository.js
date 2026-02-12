export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUserByEmail = (email) => this.dao.getByEmail(email);
    getUserById = (id) => this.dao.getById(id);
    createUser = (user) => this.dao.create(user);
    updatePassword = (id, password) =>
        this.dao.updatePassword(id, password);
}