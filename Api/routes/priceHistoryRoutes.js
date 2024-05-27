import express from 'express';

import {getPriceHistory, createPriceHistory, getPriceHistoryById, updatePriceHistory, deletePriceHistory} from '../controllers/priceHistoryControllers.js';

const router = express.Router();

router.get('/', getPriceHistory);
router.post('/', createPriceHistory);
router.get('/:id', getPriceHistoryById);
router.put('/:id', updatePriceHistory);
router.delete('/:id', deletePriceHistory);

router.get('/addresses', getPriceHistory);

export default router;