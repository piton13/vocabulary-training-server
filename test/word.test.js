const Word = require('../api/models/word');

describe('API Word Routes', function() {
    beforeEach((done) => { //To clear list of words
        Word.remove({}, (err) => {
            done();
        });
    });

    describe('/GET words', () => {
        it('should GET empty list of words', (done) => {
            request.get('/words')
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
            const word = {
                foreign: 'word',
                translation: 'word translation'
            };
            request.post('/words')
                .send(word)
                .end((err, res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.successAnswers.should.be.eql(0);
                    res.body.learned.should.be.eql(false);
                    res.body.foreign.should.be.eql(word.foreign);
                    res.body.translation.should.be.eql(word.translation);
                    res.body._id.should.be.exist;
                    done();
                });
        });
    });

    describe('/PATCH word', () => {
        it('should update obtained word in DB', (done) => {
            const word = new Word({
                foreign: 'word',
                translation: 'word translation'
            });
            word.save((err, word) => {
                const updatedWord = {
                    translation: 'updated translation'
                };
                request.patch('/words/' + word._id)
                    .send(updatedWord)
                    .end((err, res) => {
                        res.statusCode.should.be.eql(201);
                        request.get('/words/' + word._id)
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
    });
});