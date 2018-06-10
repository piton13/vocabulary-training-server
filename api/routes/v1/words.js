const wordControllers = require('../../controllers/word');
const express = require('express');

const app = express();

const wrapAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

app.route('/words')
    .get(wrapAsync(wordControllers.getWords))
    .post(wrapAsync(wordControllers.saveWord));

app.route('/words/:id')
    .get(wrapAsync(wordControllers.getWord))
    .patch(wrapAsync(wordControllers.updateWord));

app.route('/words-statistic')
    .get(wrapAsync(wordControllers.getWordsStatistic));

app.route('/words-to-learn')
    .get(wrapAsync(wordControllers.getWordsForLearn));
// .patch(wrapAsync(wordControllers.updateLearnedWord));
/*
app.route('/words/synchronize')
    .post(wrapAsync(wordControllers.saveWords))
    .patch(wordControllers.updateWords);*/

module.exports = app;