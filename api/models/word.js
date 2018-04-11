var mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    foreign: {
        type: String,
        required: true,
        message: 'Foreign name is mandatory for word'
    },
    translation: {
        type: String,
        required: true,
        message: 'Translation for word is mandatory'
    },
    islearned: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Word', WordSchema);