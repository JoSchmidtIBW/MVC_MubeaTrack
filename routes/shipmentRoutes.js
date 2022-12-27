const express = require('express');
const shipmentController = require('../controllers/shipmentController');

const router = express.Router();

router
  .route('/')
  .get(shipmentController.getAllShipments)
  .post(shipmentController.createShipment);

router
  .route('/:id')
  .get(shipmentController.getShipment)
  .patch(shipmentController.updateShipment)
  .delete(shipmentController.deleteShipment);

module.exports = router;
