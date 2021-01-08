const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'admin'
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    date_added: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: '/public/avatar/default/avatar.png'
    },
    roll: {
        type: String,
        default: 'manager'
    },
    phone: {
        type: String,
    },
});

const Manager = mongoose.model('manager', ManagerSchema);

module.exports = Manager;