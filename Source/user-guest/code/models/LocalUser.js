const mongoose = require('mongoose');

const LocalUserSchema = mongoose.Schema ({
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
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/nmcnpmctt2/image/upload/v1610717547/nmcnpmctt2/avatar/default/avatar_oubqnx.png'
    },
    gender:{
        type: String,
        default: 'female'
    }
})

const LocalUser = mongoose.model('localusers', LocalUserSchema);

module.exports = LocalUser;