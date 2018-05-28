const wordService = require('../db-services/wordService');

async function getWords(req, res) {
    const isLearned = req.query.learned;
    try {
        const words = await wordService.getWords(isLearned);
        res.json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToFindInDB',
            message: 'Can not find any words'
        });
    }
}

async function saveWord(req, res) {
    const word = {
        foreign: req.body.foreign,
        translation: req.body.translation
    };

    try {
        const result = await wordService.saveWord(word);
        res.json(result);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToSaveToDB',
            message: 'Word was not saved to DB'
        });
    }
}

async function getWord(req, res) {
    const wordId = req.params.id;
    try {
        const word = await wordService.getWordById(wordId);
        res.json(word);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToFindInDB',
            message: 'Can not specified word'
        });
    }
}

async function updateWord(req, res) {
    const wordId = req.params.id;
    const updatedData = {
        translation: req.body.translation,
        learned: false
    };

    try {
        const words = await wordService.updateWord(wordId, updatedData);
        res.status(201).json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToSaveToDB',
            message: 'Can not save to DB'
        });
    }
}

async function getWordsForLearn(req, res) {
    try {
        const words = await wordService.getWordsForLearn();
        res.json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToFindInDB',
            message: 'Can not find any words'
        });
    }
}

async function updateLearnedWord(req, res) {
    const wordId = req.body._id;
    const updatedData = req.body.updatedData;

    try {
        const words = await wordService.updateWord(wordId, updatedData);
        res.json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToSaveToDB',
            message: 'Can not save to DB'
        });
    }
}

async function getWordsStatistic(req, res) {
    try {
        const words = await wordService.getWordsStatistic();
        res.json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToFindInDB',
            message: 'Can not find any words'
        });
    }
}

async function saveWords(req, res) {
    const words = req.body.map((word) => ({
        foreign: word.foreign,
        translation: word.translation
    }));

    try {
        const words = await wordService.saveWords(words);
        res.json(words);
    } catch(e) {
        res.status(403).json({
            type: 'FailedToSaveToDB',
            message: 'Words was not saved to DB'
        });
    }
}

function updateWords(req, res) {
    res.end('Not implemented yet!');
}

module.exports = {
    getWords,
    saveWord,
    getWord,
    updateLearnedWord,
    getWordsStatistic,
    getWordsForLearn,
    saveWords,
    updateWord,
    updateWords
};