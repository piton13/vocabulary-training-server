const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

global.app = app;
global.chai = chai;
global.should = chai.should();
global.expect = chai.expect;
global.request = supertest(app);

const server = require('../server');

after((done) => { //To close server
    process.exit(0);
    done();
});