"use strict";

var mongoose = require('mongoose');

var FaceBookUserSchema = mongoose.Schema({
  facebookId: String,
  token: String,
  email: String,
  name: String,
  gender: {
    type: String,
    "default": 'female'
  },
  avatar: {
    type: String,
    "default": '/public/avatar.png'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
var FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);
module.exports = FaceBookUser;