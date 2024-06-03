import express from "express";
import { authenticateToken, authorizeRole } from "../controllers/middlewareController.js";

const router = express.Router();

router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.send('Admin content');
});

export default router;


