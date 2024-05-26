import express from 'express';
import { createPromotion, getPromotions, getPromotionsByProductId, updatePromotion, deletePromotion } from '../controllers/promotionsControllers.js';

const router = express.Router();

router.post('/', createPromotion);
router.get('/', getPromotions);
router.get('/:id', getPromotionsByProductId);
router.put('/:id', updatePromotion);
router.delete('/:id', deletePromotion);

export default router;