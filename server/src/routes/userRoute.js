import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.get('/users', UserController.getAllUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
