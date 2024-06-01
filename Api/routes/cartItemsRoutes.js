import express from 'express';
import { getCartItems, addCartItem, updateCartItemQuantity, removeCartItem } from '../controllers/cartItemsControllers.js';

const router = express.Router();

router.post('/add', addCartItem);
router.get('/:userId', getCartItems);
router.delete('/remove', removeCartItem);
router.put('/update', updateCartItemQuantity);

export default router;