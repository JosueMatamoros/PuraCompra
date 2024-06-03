import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUsers, registerUsers, getUserDetails, countUsersByRole, updateUserRole} from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUsers);
router.post('/register', registerUsers);
router.put('/:id', updateUser); // Verifica que esta ruta exista
router.delete('/:id', deleteUser);
router.get('/profile/:id', getUserDetails);
router.get('/count/:role', countUsersByRole);
router.put('/:id/role', updateUserRole);


export default router;