import express from 'express';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/messages', MessageController.createMessage);
router.get('/messages/:id', MessageController.getMessageById);
router.get('/messages', MessageController.getAllMessages);
router.put('/messages/:id', MessageController.updateMessage);
router.get('/messages/user/:id', MessageController.getUserMessages);
router.delete('/messages/:id', MessageController.deleteMessage);

export default router;
