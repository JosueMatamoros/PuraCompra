import express from "express";
import { createShipment, getShipments, getShipmentById, updateShipment, deleteShipment, countShipmentsByState, getShipmentsByOrderId } from "../controllers/shipmentsControllers.js";

const router = express.Router();

router.post('/', createShipment);
router.get('/', getShipments);
router.get('/shipments/:orderId', getShipmentsByOrderId); 
router.get('/:id', getShipmentById);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);
router.get('/count/:state', countShipmentsByState);

export default router;