const mongoose = require('mongoose')

const HistoryPaymentSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    idSchedule: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const HistoryPayment = mongoose.model('historypayments', HistoryPaymentSchema);

module.exports = HistoryPayment;