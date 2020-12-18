const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: '/public/default_poster/poster.png'
    }
});

const Film = mongoose.model('films', FilmSchema);

module.exports = Film; 