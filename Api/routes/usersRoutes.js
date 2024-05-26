import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUsers, registerUsers, getUserDetails } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUsers);
router.post('/register', registerUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/profile/:id', getUserDetails);


export default router;