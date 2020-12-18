const mongoose = require('mongoose');

const UserBookTicketSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    idTickets: {
        type: [mongoose.Schema.ObjectId],
        required: true
    },
    totalMoney: {
        type: Number,
        default: 0
    }
});

const UserBookTicket = mongoose.model('userbooktickets', UserBookTicketSchema);

module.exports = UserBookTicket;