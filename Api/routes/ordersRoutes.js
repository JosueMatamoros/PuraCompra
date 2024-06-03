import express from 'express';

import {getOrders, createOrder, getOrdersByUserId, updateOrder, deleteOrder, getOrderById } from '../controllers/ordersControllers.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;