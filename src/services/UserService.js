// Models
const UserModel = require("../models/User");

class _UserService {
  async getUsers() {
    const users = await UserModel.find({});

    return users;
  }

  async getUserById(id) {
    const user = await UserModel.findById(id);

    return user;
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async createUser(payload) {
    const user = await UserModel.create(payload);

    return user;
  }

  async updateUser(id, payload) {
    const old = await UserModel.findByIdAndUpdate(id, { $set: payload });

    return old;
  }

  async deleteUser(id) {
    const deleted = await UserModel.findByIdAndDelete(id);

    return deleted;
  }
}

module.exports = new _UserService();
