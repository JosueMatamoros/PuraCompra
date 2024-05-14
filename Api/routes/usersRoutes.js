import express from 'express';
import { getUsers, getUserById } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;