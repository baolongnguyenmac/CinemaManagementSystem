const mongoose = require('mongoose');

const FilmSche = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    
})