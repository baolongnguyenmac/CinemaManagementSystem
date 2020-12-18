"use strict";

var mongoose = require('mongoose');

var SeatSchema = mongoose.Schema({
  serial: {
    required: true,
    type: Number
  },
  idRoom: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'rooms'
  }
});
var Seat = mongoose.model('seats', SeatSchema);
module.exports = Seat;