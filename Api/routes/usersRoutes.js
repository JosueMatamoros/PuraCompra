import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUsers } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;