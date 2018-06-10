const Word = require('../api/models/word');
const apiVersion = '/api/v1';

describe('API Word Routes', function() {
    let word;

    before((done) => { //To clear list of words
        word = {
            foreign: 'word',
            translation: 'word translation'
        };
        Word.remove({}, (err) => {
            done();
        });
    });

    describe('/GET words', () => {
        it('should GET empty list of words', (done) => {
            request.get(`${apiVersion}/words`)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST word', () => {
        it('should save obtained word to DB', (done) => {
            request.post(`${apiVersion}/words`)
                .send(word)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.successAnswers.should.be.eql(0);
                    res.body.learned.should.be.eql(false);
                    res.body.foreign.should.be.eql(word.foreign);
                    res.body.translation.should.be.eql(word.translation);
                    word._id = res.body._id;
                    res.body._id.should.be.exist;
                    done();
                });
        });
    });

    describe('/GET word', () => {
        it('should find specified word by id in DB', (done) => {
            request.get(`${apiVersion}/words/${word._id}`)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.should.be.a('object');
                    res.body.learned.should.be.eql(false);
                    res.body.successAnswers.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/PATCH word', () => {
        it('should update specified word in DB', (done) => {
            const updatedWord = {
                translation: 'updated translation'
            };
            request.patch(`${apiVersion}/words/${word._id}`)
                .send(updatedWord)
                .end((err, res) => {
                    res.statusCode.should.be.eql(201);
                    request.get(`${apiVersion}/words/${word._id}`)
                        .end((err, res) => {
                            res.statusCode.should.be.eql(200);
                            res.body.successAnswers.should.be.eql(0);
                            res.body.learned.should.be.eql(false);
                            res.body.foreign.should.be.eql(word.foreign);
                            res.body.translation.should.be.eql(updatedWord.translation);
                            done();
                        });
                });
        });
    });

    describe('/GET words statistic', () => {
        it('should obtain statistic of words from DB', (done) => {
            request.get(`${apiVersion}/words-statistic`)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.learned.should.be.eql(0);
                    res.body.notLearned.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/GET words for learning', () => {
        it('should obtain words to learn from DB', (done) => {
            request.get(`${apiVersion}/words-to-learn`)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].learned.should.be.eql(false);
                    done();
                });
        });
    });
});