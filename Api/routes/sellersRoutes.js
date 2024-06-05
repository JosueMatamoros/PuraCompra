import express from "express";
import { createSeller, getSellers, getSellerById, updateSeller, deleteSeller, countSellers } from "../controllers/sellersControllers.js";

const router = express.Router();

router.post("/", createSeller);
router.get("/", getSellers);
router.get("/:id", getSellerById);
router.put("/:id", updateSeller);
router.delete("/:id", deleteSeller);
router.get('/count/sellers', countSellers);

export default router;