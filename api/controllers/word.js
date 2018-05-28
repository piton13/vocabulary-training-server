const wordService = require('../db-services/wordService');

async function getWords(req, res, next) {
    const isLearned = req.query.learned;
    try {
        const words = await wordService.getWords(isLearned);
        res.json(words);
    } catch(e) {
        next(e);
    }
}

async function saveWord(req, res, next) {
    const word = {
        foreign: req.body.foreign,
        translation: req.body.translation
    };

    try {
        const result = await wordService.saveWord(word);
        res.json(result);
    } catch(e) {
        next(e);
    }
}

async function getWord(req, res, next) {
    const wordId = req.params.id;
    try {
        const word = await wordService.getWordById(wordId);
        res.json(word);
    } catch(e) {
        next(e);
    }
}

async function updateWord(req, res, next) {
    const wordId = req.params.id;
    const updatedData = {
        translation: req.body.translation,
        learned: false
    };

    try {
        const words = await wordService.updateWord(wordId, updatedData);
        res.status(201).json(words);
    } catch(e) {
        next(e);
    }
}

async function getWordsForLearn(req, res, next) {
    try {
        const words = await wordService.getWordsForLearn();
        res.json(words);
    } catch(e) {
        next(e);
    }
}

async function updateLearnedWord(req, res, next) {
    const wordId = req.body._id;
    const updatedData = req.body.updatedData;

    try {
        const words = await wordService.updateWord(wordId, updatedData);
        res.json(words);
    } catch(e) {
        next(e);
    }
}

async function getWordsStatistic(req, res, next) {
    try {
        const words = await wordService.getWordsStatistic();
        res.json(words);
    } catch(e) {
        next(e);
    }
}

async function saveWords(req, res, next) {
    const words = req.body.map((word) => ({
        foreign: word.foreign,
        translation: word.translation
    }));

    try {
        const words = await wordService.saveWords(words);
        res.json(words);
    } catch(e) {
        next(e);
    }
}

function updateWords(req, res, next) {
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