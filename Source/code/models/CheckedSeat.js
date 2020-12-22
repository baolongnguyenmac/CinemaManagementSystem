const mongoose = require('mongoose');

const CheckedSeatSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'Phòng x lịch chiếu y đã có những ghế sau được đặt'
    },
    idSchedule: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'schedules'
    },
    idSeats: {
        type: [mongoose.Schema.ObjectId],
        ref: 'seats'
    }
});

const CheckedSeat = mongoose.model('checkedseats', CheckedSeatSchema);

module.exports = CheckedSeat;