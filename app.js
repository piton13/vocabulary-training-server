'use strict';

const wordsV1 = require('./api/routes/v1/words');
const authorizationV1 = require('./api/routes/v1/authorize');
const errorHandlerMiddleware = require('./api/error-handlers');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('case sensitive routing', true);
app.set('strict routing', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/authorize', authorizationV1);
app.use('/api/v1', wordsV1);

app.use(errorHandlerMiddleware.handleAuthErrors, errorHandlerMiddleware.handleDBErrors, errorHandlerMiddleware.handleOtherErrors);

module.exports = app;