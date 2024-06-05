import express from 'express';
import {getProductImagesByProductId, createProductImage} from '../controllers/ProductImagesControllers.js';
const router = express.Router();

router.get('/:id', getProductImagesByProductId);
router.post('/', createProductImage);


export default router;
