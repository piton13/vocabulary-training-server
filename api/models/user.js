const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        message: 'Login is mandatory for word'
    },
    password: {
        type: String,
        required: true,
        message: 'Password is mandatory for word'
    }
});

module.exports = mongoose.model('User', UserSchema);
