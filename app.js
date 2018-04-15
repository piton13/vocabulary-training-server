'use strict';

const wordControllers = require('./api/controllers/word');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 10010);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/words/statistic')
    .get(wordControllers.getWordsStatistic);

app.route('/words')
    .get(wordControllers.getWords)
    .post(wordControllers.saveWord);

module.exports = app;