const wordModel = require('../models/word');

function getWords(req, res) {
    const isLearned = req.query.learned || false;
    wordModel.find({learned: isLearned}, (err, data) => {
        if (err) {
            // throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        res.json(data);
    });
}

function getWordsForLearn(req, res) {
    wordModel.aggregate([
        { $sample: { size: 10 }},
        { $match:  {learned: false} }
    ]).exec((err, data) => {
        if (err) {
            // throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        res.json(data);
    });
}

function updateLearnedWord(req, res) {
    const wordId = req.body._id;
    const translationAnswer = req.body.translation;
    const updatedData = {};
    let status;

    wordModel.findOne({
        _id: wordId
    }).exec((err, data) => {
        if (err) {
            // throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        if (data.translation === translationAnswer) {
            updatedData.successAnswers = ++data.successAnswers;
            status = 'correct answer';
            res.status(200);
        } else {
            updatedData.successAnswers = data.successAnswers - 3;
            status = 'not correct answer';
            res.status(406);
        }

        if(updatedData.successAnswers < 0) {updatedData.successAnswers = 0}
        if(updatedData.successAnswers > 6) {updatedData.learned = true}

        wordModel.updateOne({_id: wordId}, {$set: updatedData})
            .exec((err) => {
                if (err) {
                    // throw new Error('Failed to update record');
                    res.status(403).json({
                        type: 'FailedToUpdateInDB',
                        message: 'Can not update word answer'
                    });
                }
                res.json({status: status});
            });
    });
}

function updateWord(req, res) {
    const wordId = req.body._id;
    const updatedData = {
        translation: req.body.translation,
        learned: false
    };

    wordModel.updateOne({_id: wordId}, {$set: updatedData})
        .exec((err) => {
            if (err) {
                // throw new Error('Failed to update record');
                res.status(403).json({
                    type: 'FailedToUpdateInDB',
                    message: 'Can not update word answer'
                });
            }
            res.status(201).json({
                message: 'word was successfully updated'
            });
        });
}

function getWordsStatistic(req, res) {
    wordModel.find({}, (err, data) => {
        if (err) {
            // throw new Error('Failed to find in DB');
            res.status(403).json({
                type: 'FailedToFindInDB',
                message: 'Can not find any words'
            });
        }
        const learnedCount = data.filter((item) => item.learned).length;

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
            // throw new Error('Failed to save to DB');
            res.status(403).json({
                type: 'FailedToSaveToDB',
                message: 'Word was not saved to DB'
            });
        }
        res.json(data);
    });
}

function saveWords(req, res) {
    const words = req.body.map((word) => ({
                foreign: word.foreign,
                translation: word.translation
            }));

    wordModel.insertMany(words, (err, data) => {
        if (err) {
            // throw new Error('Failed to save to DB');
            res.status(403).json({
                type: 'FailedToSaveToDB',
                message: 'Words was not saved to DB'
            });
        }
        res.end('Records were successfully saved!');
    });
}

function updateWords(req, res) {
    res.end('Not implemented yet!');
}

module.exports = {
    updateLearnedWord,
    getWordsStatistic,
    getWordsForLearn,
    getWords,
    saveWord,
    saveWords,
    updateWord,
    updateWords
};