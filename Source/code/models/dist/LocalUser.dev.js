"use strict";

var mongoose = require('mongoose');

var LocalUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  avatar: {
    type: String,
    "default": '/public/avatar.png'
  },
  gender: {
    type: String,
    "default": 'female'
  }
});
var LocalUser = mongoose.model('localusers', LocalUserSchema);
module.exports = LocalUser;