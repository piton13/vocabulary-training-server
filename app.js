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
    .get(wordControllers.getWords)
    .post(wordControllers.saveWord);

app.route('/words/:id')
    .get(wordControllers.getWord)
    .patch(wordControllers.updateWord);

app.route('/words/statistic')
    .get(wordControllers.getWordsStatistic);

app.route('/words/learn')
    .get(wordControllers.getWordsForLearn)
    .patch(wordControllers.updateLearnedWord);

app.route('/words/synchronize')
    .post(wordControllers.saveWords)
    .patch(wordControllers.updateWords);

app.use(errorHandlerMiddleware.handleDBErrors, errorHandlerMiddleware.handleOtherErrors);

module.exports = app;