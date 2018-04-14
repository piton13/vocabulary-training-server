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
    successAnswers: {
	type: Number,
	default: 0,
	min: 0,
	max: 7
    },
    learned: {
        type: Boolean,
        default: false
    },
    creationDate: {
	type: Date,
	default: Date.now
    },
    lastSuccessAnswer: {
	type: Date,
	required: true
    }
});

module.exports = mongoose.model('Word', WordSchema);
