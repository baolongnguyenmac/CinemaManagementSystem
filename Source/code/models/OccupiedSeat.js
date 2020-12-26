const mongoose = require('mongoose');

//OccupiedSeat dùng để đánh dấu những ghế đã được đặt
const OccupiedSeatSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'Phòng x lịch chiếu y đã có những ghế sau được đặt'
    },
    idSchedule: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'schedules',
        unique: true
    },
    idSeats: {
        type: [mongoose.Schema.ObjectId],
        ref: 'seats',
        default: []
    }
});

const OccupiedSeat = mongoose.model('occupiedseats', OccupiedSeatSchema);

module.exports = OccupiedSeat;