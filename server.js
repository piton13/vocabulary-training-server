const app = require('./app');
const mongoose = require('mongoose');

const dbURI = `mongodb://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@ds129906.mlab.com:29906/${process.env.MONGOOSE_DB}`;
const dbConnectionTimeout = 60*60*1000;

app.listen(app.get('port'), function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${app.get('port')}`);
});

mongoose.connect(dbURI).then(function () {
    console.log('...connection was successful');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

mongoose.connection.on('connected', function () {
    console.log('<<<< Mongoose default connection open to ' + dbURI);
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
