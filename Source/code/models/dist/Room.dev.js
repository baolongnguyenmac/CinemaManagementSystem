"use strict";

var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({
  numberOfSeats: {
    required: true,
    type: Number
  }
});
var Room = mongoose.model('rooms', RoomSchema);
module.exports = Room;