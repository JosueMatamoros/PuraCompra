import express from 'express';

import {getProductPromotions, createProductPromotion, getProductPromotionById, updateProductPromotion, deleteProductPromotion} from '../controllers/productPromotionsControllers.js';

const router = express.Router();

router.get('/', getProductPromotions);
router.post('/', createProductPromotion);
router.get('/:id', getProductPromotionById);
router.put('/:id', updateProductPromotion);
router.delete('/:id', deleteProductPromotion);

export default router;