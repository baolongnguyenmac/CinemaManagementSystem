const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true,
    },
    idSchedule: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'schedules'
    },
    idSeat: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'seats'
    },
    idUser: {
        type: mongoose.Schema.ObjectId
    }
});

const Ticket = mongoose.model('tickets', TicketSchema);

module.exports = Ticket;