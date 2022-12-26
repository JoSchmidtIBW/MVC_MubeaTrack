import Shipment from '../models/shipmentModel.mjs';

exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find();

        res.status(200).json({
            status: 'success',
            results: shipments.length,
            data: {
                shipments
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                shipment
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createShipment = async (req, res) => {
    try {
        const newShipment = await Shipment.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                shipment: newShipment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }
};

exports.updateShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                shipment,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteShipment = async (req, res) => {
    try {
        await Shipment.findByIdAndDelete(req.params.id);
        res.status(204).json({
            data: null,
            status: 'success',
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};
export default class shipmentController {
}