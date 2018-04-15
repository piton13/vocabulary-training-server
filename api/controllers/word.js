const wordModel = require('../models/word');

function getWords(req, res) {
    wordModel.find({}, (err, data) => {
        if (err) {
            throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        res.json(data);
    });
}

function getWordsStatistic(req, res) {
    wordModel.find({}, (err, data) => {
        if (err) {
            throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        const learnedCount = data.filter((item) => {
            item.learned
        }).length;

        res.json({
            learned: learnedCount,
            notLearned: data.length - learnedCount
        });
    });
}

function saveWord(req, res) {
    const word = {
        foreign: req.body.foreign,
        translation: req.body.translation
    };

    wordModel.create(word, (err, data) => {
        if (err) {
            throw new Error('Failed to save to DB');
            res.status(403).json({
                type: 'FailedToSaveToDB',
                message: 'Word was not saved to DB'
            });
        }
        res.json(data);
    });
}

module.exports = {
    getWordsStatistic,
    getWords,
    saveWord
};