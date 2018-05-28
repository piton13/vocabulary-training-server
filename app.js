'use strict';

const wordControllers = require('./api/controllers/word');
const errorHandlerMiddleware = require('./api/error-handlers');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('case sensitive routing', true);
app.set('strict routing', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/words')
    .get(wrapAsync(wordControllers.getWords))
    .post(wrapAsync(wordControllers.saveWord));

app.route('/words/:id')
    .get(wrapAsync(wordControllers.getWord))
    .patch(wrapAsync(wordControllers.updateWord));

app.route('/words/statistic')
    .get(wrapAsync(wordControllers.getWordsStatistic));

app.route('/words/learn')
    .get(wrapAsync(wordControllers.getWordsForLearn))
    .patch(wrapAsync(wordControllers.updateLearnedWord));

app.route('/words/synchronize')
    .post(wrapAsync(wordControllers.saveWords))
    .patch(wordControllers.updateWords);

app.use(errorHandlerMiddleware.handleDBErrors, errorHandlerMiddleware.handleOtherErrors);

function wrapAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports = app;