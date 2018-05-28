const DBError = require('../../utils/DBErrors');

function handleDBErrors(err, req, res, next) {
    if (err instanceof DBError) {
        res.status(err.status).json({
            message: err.message,
            stack: err.stack,
            string: err.toString()
        });
    }
    next(err);
}

function handleOtherErrors(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        string: err.toString(),
        name: err.name,
    });
}

module.exports = {
    handleDBErrors,
    handleOtherErrors
};