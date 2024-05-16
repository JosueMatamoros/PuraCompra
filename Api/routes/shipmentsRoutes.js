import express from "express";
import { createShipment, getShipments, getShipmentById, updateShipment, deleteShipment } from "../controllers/shipmentsControllers.js";

const router = express.Router();

router.post('/', createShipment);
router.get('/', getShipments);
router.get('/:id', getShipmentById);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);

export default router;