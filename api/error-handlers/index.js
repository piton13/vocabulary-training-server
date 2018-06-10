const DBError = require('../../utils/DBErrors');
const AuthError = require('../../utils/AuthErrors');

function handleAuthErrors(err, req, res, next) {
    if (err instanceof AuthError) {
        res.status(err.status).json({
            type: 'AuthErrorException',
            message: err.message,
            stack: err.stack,
            string: err.toString()
        });
    }
    next(err);
}

function handleDBErrors(err, req, res, next) {
    if (err instanceof DBError) {
        res.status(err.status).json({
            type: 'DBErrorException',
            message: err.message,
            stack: err.stack,
            string: err.toString()
        });
    }
    next(err);
}

function handleOtherErrors(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        string: err.toString(),
        name: err.name,
    });
}

module.exports = {
    handleAuthErrors,
    handleDBErrors,
    handleOtherErrors
};