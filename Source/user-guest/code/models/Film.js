const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: 'https://res.cloudinary.com/nmcnpmctt2/image/upload/v1610717537/nmcnpmctt2/poster/default/poster_mgtgfp.png'
    },
    description: {
        type: String,
        default: 'Đây là mô tả phim'
    },
    director: {
        type: String,
        default: 'Tác giả mặc định'
    },
    cast: {
        type: String,
        default: 'Diễn viên mặc định'
    },
    genre: {
        type: String,
        default: 'Thể loại mặc định'
    },
    runningTime: {
        type: String,
        default: '100 phút'
    },
    releaseTime: {
        type: Date,
        default: new Date('2021-11-1')
    },
    trailer: {
        type: String,
        default: ""
    }
});

const Film = mongoose.model('films', FilmSchema);

module.exports = Film; 