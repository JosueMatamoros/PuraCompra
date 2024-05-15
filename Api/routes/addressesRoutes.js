import express from 'express';
import { getAddresses, getAddressById } from '../controllers/addressesControllers.js';

const router = express.Router();

router.get('/', getAddresses);
router.get('/:id', getAddressById);

export default router;