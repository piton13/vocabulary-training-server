const express = require('express');
const authService = require('../../db-services/authService');

const app = express();

const wrapAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

async function authorize(req, res, next) {
    const credentials = {
        login: req.body.login,
        password: req.body.password
    };
    await authService.checkUser(credentials);
    res.status(204).end();
}

app.route('/')
    .post(wrapAsync(authorize));

module.exports = app;