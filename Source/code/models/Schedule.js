const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    name: {
        type: String
    },
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