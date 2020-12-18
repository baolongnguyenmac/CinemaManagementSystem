const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    totalMoney: {
        type: Number,
        default: 0
    },
    idUserBookTiket: {
        type: [mongoose.Schema.ObjectId],
        required: true,
        ref: 'UserBookTicket'
    }
});

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;