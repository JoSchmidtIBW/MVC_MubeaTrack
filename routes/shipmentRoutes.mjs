import express from 'express';
import shipmentController from '../controllers/shipmentController.mjs';

const router = express.Router();

router
    .route('/')
    .get(shipmentController.getAllShipments)
    .post(shipmentController.createShipment);

router
    .route('/:id')
    .get(shipmentController.getShippment)
    .patch(shipmentController.updateShipment)
    .delete(shipmentController.deleteShipment);

module.exports = router;