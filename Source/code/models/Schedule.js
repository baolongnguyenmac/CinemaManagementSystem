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
        ref: 'films',
        required: true
    },
    idRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'rooms',
        required: true
    }
    
});

const Schedule = mongoose.model('schedules', ScheduleSchema);

module.exports = Schedule;