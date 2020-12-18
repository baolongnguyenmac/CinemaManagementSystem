"use strict";

var mongoose = require('mongoose');

var PaymentSchema = mongoose.Schema({
  paymentId: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    "default": ""
  }
});