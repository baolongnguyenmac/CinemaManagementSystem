const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    numberOfSeats: {
        required: true,
        type: Number
    }
})

const Room = mongoose.model('rooms', RoomSchema);

module.exports = Room;