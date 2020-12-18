"use strict";

var mongoose = require('mongoose');

var TicketSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true,
    "default": Date.now()
  },
  price: {
    type: Number,
    required: true
  },
  idSchedule: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Schedule'
  },
  idSeat: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Seat'
  },
  idUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});
var Ticket = mongoose.model('tickets', TicketSchema);
module.exports = Ticket;