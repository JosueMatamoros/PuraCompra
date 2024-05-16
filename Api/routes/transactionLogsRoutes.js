import express from "express";
import { createTransactionLog, getTransactionLogs, getTransactionLogById, updateTransactionLog, deleteTransactionLog } from "../controllers/transactionLogsControllers.js";

const router = express.Router();

router.post("/", createTransactionLog);
router.get("/", getTransactionLogs);
router.get("/:id", getTransactionLogById);
router.put("/:id", updateTransactionLog);
router.delete("/:id", deleteTransactionLog);

export default router;