import express from "express";
import { createReview, getReviews, getReviewByProductId, updateReview, deleteReview } from "../controllers/reviewsControllers.js";

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewByProductId);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;