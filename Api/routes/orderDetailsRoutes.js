import express from 'express';

import {getOrderDetails, createOrderDetail, getOrderDetailById, updateOrderDetail, deleteOrderDetail} from '../controllers/orderDetailsControllers.js';

const router = express.Router();

router.get('/', getOrderDetails);
router.post('/', createOrderDetail);
router.get('/:id', getOrderDetailById);
router.put('/:id', updateOrderDetail);
router.delete('/:id', deleteOrderDetail);

export default router;