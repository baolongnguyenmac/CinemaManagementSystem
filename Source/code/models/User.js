const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    _AnhYeuem: mongoose.Types.ObjectId,
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
    }
})

const User = mongoose.model('users', UserSchema);

module.exports = User;