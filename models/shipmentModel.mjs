const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    shipmentDate: {
        type: Date,
        required: [true, 'A shipment must have a date'],
        default: Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    client: {
        type: String,
        required: [true, 'A shipment must have a client assigned']
    },
    amount: {
      type: Number,
      required: [true, 'A shipment must have an amount in tons assigned'],
    },
    inStock: {
        type: Boolean,
        default: false,
    },
    deliveryNote: {
        type: Boolean,
        default: false,
    },
    rk: {
        type: Boolean,
        default: false,
    },
    comment: {
        type: String,
        trim: true,
    },
});
const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
