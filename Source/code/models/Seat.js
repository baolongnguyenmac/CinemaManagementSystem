const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
    serial: {
        required: true,
        type: Number
    },
    idRoom: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'rooms'
    }
});

const Seat = mongoose.model('seats', SeatSchema);

module.exports = Seat;