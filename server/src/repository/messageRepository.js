import Message from '../models/Message.js';

class MessageRepository {
  async createMessage(data) {
    return await Message.create(data);
  }

  async getMessageById(id) {
    return await Message.findByPk(id);
  }

  async getMessageByUserId(id) {
    return await Message.findAll({
      where: {
        userId: id
      }
    });
  }


  async getAllMessages() {
    return await Message.findAll();
  }

  async updateMessage(id, data) {
    const message = await Message.findByPk(id);
    if (message) {
      await message.update(data);
      return message;
    }
    return null;
  }

  async deleteMessage(id) {
    const message = await Message.findByPk(id);
    if (message) {
      await message.destroy();
      return true;
    }
    return false;
  }
}

export default new MessageRepository();
