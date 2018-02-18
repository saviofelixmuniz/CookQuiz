/**
 * @author Sávio Muniz
 */

const Quizes = require('../models/quizes');
const Answers = require('../models/answers');
const RestHelper = require('../helpers/rest-helper');

function createQuiz(req,res) {
    var newQuiz = req.body;
    newQuiz.active = false;

    Quizes.create(newQuiz).then(function (quiz) {
        RestHelper.sendJsonResponse(res, 200, quiz);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function getQuizes(req,res) {
    Quizes.getWithAnswers().then(function (quizes) {
        quizes.forEach(function (quiz) {
            quiz.answers = quiz.answers.length;
        });
        RestHelper.sendJsonResponse(res, 200, quizes);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function updateQuiz(req, res) {
    Quizes.update({ _id: req.params.quizId }, { $set: req.body}).then(function (quiz) {
        RestHelper.sendJsonResponse(res, 200, quiz);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function setActive(req, res) {
    Quizes.findOne({active : true}).then(function (quiz) {
        if (quiz) {
            Quizes.update({ _id: quiz._id }, { $set: {active : false}}).then(function (deactivatedQuiz) {
                activateQuiz(req, res);
            })
            .catch(function (err) {
                RestHelper.sendJsonResponse(res, 400, err);
            });
        } else {
            activateQuiz(req, res);
        }
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });

}

function activateQuiz(req, res) {
    Quizes.update({ _id: req.params.quizId }, { $set: {active : true}}).then(function (quiz) {
        RestHelper.sendJsonResponse(res, 200, quiz);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function getActive(req, res) {
    Quizes.findOne({active : true}).then(function (quiz) {
        if(!quiz)
            RestHelper.sendJsonResponse(res, 200, {});
        RestHelper.sendJsonResponse(res, 200, quiz);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function deactivateAll(req,res) {
    Quizes.findOne({active : true}).then(function (quiz) {
        console.log(quiz);
        Quizes.update({ _id: quiz._id }, { $set: {active : false}}).then(function (deactivatedQuiz) {
            RestHelper.sendJsonResponse(res, 200, deactivatedQuiz);
        })
        .catch(function (err) {
            RestHelper.sendJsonResponse(res, 400, err);
        });
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

module.exports = {
    createQuiz : createQuiz,
    getQuizes : getQuizes,
    updateQuiz : updateQuiz,
    setActive : setActive,
    getActive : getActive,
    deactivateAll : deactivateAll
};