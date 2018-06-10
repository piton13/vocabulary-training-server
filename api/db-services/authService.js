const userModel = require('../models/user');
const AuthError = require('../../utils/AuthErrors');

async function authorizeUser(word) {
    return new Promise((resolve, reject) => {
        userModel.create(word, (err, data) => {
            if (err) {
                reject(new AuthError(err.message, 403));
            }
            resolve(data);
        });
    });
}

async function checkUser(word) {
    return new Promise((resolve, reject) => {
        userModel.find({login: word.login, password: word.password}, (err, data) => {
            if (err) {
                reject(new AuthError(err.message, 403));
            }
            if (!data.length) {
                reject(new AuthError('Invalid login or password', 403));
            }
            console.log(data);
            resolve();
        });
    });
}

module.exports = {
    authorizeUser,
    checkUser
};