const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    idRoom: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'rooms'
    }
});

const Seat = mongoose.model('seats', SeatSchema);

module.exports = Seat;