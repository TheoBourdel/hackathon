import User from '../models/user.js';

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(data);
      return user;
    }
    return null;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}

export default new UserRepository();
