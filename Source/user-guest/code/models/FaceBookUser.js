const mongoose = require('mongoose');

const FaceBookUserSchema = mongoose.Schema ({
    facebookId: String,
    token: String,
    email: String,
    name: String,
    gender: {
        type: String,
        default: 'female'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/nmcnpmctt2/image/upload/v1610700798/nmcnpmctt2/nmcnpmctt2/avatar/default/avatar_mfgikz_wpewj5.png'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);

module.exports = FaceBookUser;