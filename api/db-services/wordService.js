const wordModel = require('../models/word');

async function getWordById(id) {
    return new Promise((resolve, reject) => {
        wordModel.findOne({_id: id}, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function getWords(isLearned = false) {
    return new Promise((resolve, reject) => {
        wordModel.find({learned: isLearned}, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function getWordsForLearn() {
    return new Promise((resolve, reject) => {
        wordModel.aggregate([
            { $sample: { size: 10 }},
            { $match:  {learned: false} }
        ]).exec((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function updateWord(wordId, updatedData) {
    return new Promise((resolve, reject) => {
        wordModel.updateOne({_id: wordId}, {$set: updatedData})
            .exec((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        // wordModel.findOne({
        //     _id: wordId
        // }).exec((err, data) => {
        //     if (err) {
        //         reject(err);
        //     }

            // The logic should be moved onto UI to allow train words in offline mode
            /*if (data.translation === translationAnswer) {
                updatedData.successAnswers = ++data.successAnswers;
                status = 'correct answer';
                res.status(200);
            } else {
                updatedData.successAnswers = data.successAnswers - 3;
                status = 'not correct answer';
                res.status(406);
            }

            if(updatedData.successAnswers < 0) {updatedData.successAnswers = 0}
            if(updatedData.successAnswers > 6) {updatedData.learned = true}*/
        // });
    });
}


async function getWordsStatistic() {
    return new Promise((resolve, reject) => {
        wordModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            const learnedCount = data.filter((item) => item.learned).length;

            resolve({
                learned: learnedCount,
                notLearned: data.length - learnedCount
            });
        });
    });
}

async function saveWord(word) {
    return new Promise((resolve, reject) => {
        wordModel.create(word, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function saveWords(words) {
    return new Promise((resolve, reject) => {
        wordModel.insertMany(words, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    getWordById,
    updateWord,
    getWordsStatistic,
    getWordsForLearn,
    getWords,
    saveWord,
    saveWords,
};