const app = require('./app');
const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.DBHost || process.env.DBHost;
const dbConnectionTimeout = 60*60*1000;

if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    // app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

const port = config.PORT || process.env.PORT;

app.listen(port, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${port}`);
});

mongoose.connect(dbURI).then(function () {
    console.log('...connection was successful');
}).catch(function (err) {
    console.error(`Unable to connect to the database:`, err);
});

mongoose.connection.on('connected', function () {
    console.log('<<<< Mongoose was connected');
});

mongoose.connection.on('error',function (err) {
    console.log('>>>> Mongoose Connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('>>>> Mongoose default connection disconnected');
});

function closeDbConnectionByTimeout() {
    mongoose.connection.close(function () {
        console.log('>>>> Mongoose default connection disconnected through timeout');
    });
}
setTimeout(closeDbConnectionByTimeout, dbConnectionTimeout);

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.warn(err);
    process.exit(1);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = app; // for testing