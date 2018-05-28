const wordService = require('../db-services/wordService');

async function getWords(req, res) {
    const isLearned = req.query.learned;
    const words = await wordService.getWords(isLearned);
    res.json(words);
}

async function saveWord(req, res, next) {
    const word = {
        foreign: req.body.foreign,
        translation: req.body.translation
    };
    const result = await wordService.saveWord(word);
    res.json(result);
}

async function getWord(req, res, next) {
    const wordId = req.params.id;
    const word = await wordService.getWordById(wordId);
    res.json(word);
}

async function updateWord(req, res, next) {
    const wordId = req.params.id;
    const updatedData = {
        translation: req.body.translation,
        learned: false
    };
    const words = await wordService.updateWord(wordId, updatedData);
    res.status(201).json(words);
}

async function getWordsForLearn(req, res, next) {
    const words = await wordService.getWordsForLearn();
    res.json(words);
}

async function updateLearnedWord(req, res, next) {
    const wordId = req.body._id;
    const updatedData = req.body.updatedData;

    const words = await wordService.updateWord(wordId, updatedData);
    res.json(words);
}

async function getWordsStatistic(req, res, next) {
    const words = await wordService.getWordsStatistic();
    res.json(words);
}

async function saveWords(req, res, next) {
    const words = req.body.map((word) => ({
        foreign: word.foreign,
        translation: word.translation
    }));
    const words = await wordService.saveWords(words);
    res.json(words);
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