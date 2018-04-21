'use strict';

const wordControllers = require('./api/controllers/word');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('case sensitive routing', true);
app.set('strict routing', true);

app.set('port', process.env.PORT || 10010);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/words/statistic')
    .get(wordControllers.getWordsStatistic);

app.route('/words/learn')
    .get(wordControllers.getWordsForLearn)
    .patch(wordControllers.updateLearnedWord);

app.route('/words')
    .get(wordControllers.getWords)
    .patch(wordControllers.updateWord)
    .post(wordControllers.saveWord);

module.exports = app;