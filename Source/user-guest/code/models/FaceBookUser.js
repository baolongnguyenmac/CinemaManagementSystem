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
        default: '/public/avatar/default/avatar.png'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);

module.exports = FaceBookUser;