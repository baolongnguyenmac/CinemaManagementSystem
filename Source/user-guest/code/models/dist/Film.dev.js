"use strict";

var mongoose = require('mongoose');

var FilmSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
var Film = mongoose.model('films', FilmSchema);
module.exports = Film;