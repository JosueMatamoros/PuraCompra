import express from 'express';

import { createProduct ,getProducts, getProductById, updateProduct, deleteProduct, updateProductStock, countProducts } from '../controllers/productsControllers.js';
import { scrapProduct } from '../controllers/scrappersControllers.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/scrap', scrapProduct);
router.put('/:id/stock', updateProductStock);
router.get('/count/products', countProducts);

export default router;