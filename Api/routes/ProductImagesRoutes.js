import express from 'express';
import {getProductImagesByProductId} from '../controllers/ProductImagesControllers.js';
const router = express.Router();

router.get('/:id', getProductImagesByProductId);


export default router;
