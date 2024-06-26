import MessageRepository from '../repository/messageRepository.js';

class MessageController {
  async createMessage(req, res) {
    try {
      const message = await MessageRepository.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMessageById(req, res) {
    try {
      const message = await MessageRepository.getMessageById(req.params.id);
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMessages(req, res) {
    try {
      const messages = await MessageRepository.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMessage(req, res) {
    try {
      const message = await MessageRepository.updateMessage(req.params.id, req.body);
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMessage(req, res) {
    try {
      const success = await MessageRepository.deleteMessage(req.params.id);
      if (success) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getUserMessages(req, res) {

    try {
      const messages = await MessageRepository.getMessageByUserId(req.params.id);
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};




export default new MessageController();
