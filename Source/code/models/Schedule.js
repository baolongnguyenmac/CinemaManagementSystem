const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    time: {
        required: true,
        type: Date
    },
    idFilm: {
        type: mongoose.Schema.ObjectId,
        ref: 'Film',
        required: true
    },
    idRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: true
    }
});

const Schedule = mongoose.model('schedules', ScheduleSchema);

module.exports = Schedule;