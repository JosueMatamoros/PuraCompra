import express from 'express';

import { createProduct ,getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productsControllers.js';
import { scrapProduct } from '../controllers/scrapperController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/scrap', scrapProduct);

export default router;