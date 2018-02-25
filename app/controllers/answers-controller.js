/**
 * @author Sávio Muniz
 */

const Answers = require('../models/answers');
const Status = require('../models/status');
const RestHelper = require('../helpers/rest-helper');

function createAnswer(req, res) {
    var newAnswer = req.body;
    newAnswer.date = new Date();
    Answers.create(newAnswer).then(function (answer) {
        RestHelper.sendJsonResponse(res, 201, answer);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    })
}

function getAnswersByQuiz(req, res) {
    var query = {quiz : req.params.quizId};
    Answers.find(query).then(function (answers) {
        RestHelper.sendJsonResponse(res, 200, answers);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    })
}

function getAnswersByGroup(req, res) {
    var query = {group : req.params.groupId};

    Status.find(query).then(function (status) {
        var users = {};
        status.forEach(function (userStatus) {
            if (!users[userStatus.user]) {
                users[userStatus.user] = {};
            }

            users[userStatus.user].active_quiz = userStatus.quiz;
            users[userStatus.user].active_question = userStatus.question;
        });

        Answers.find(query).then(function (answers) {
            answers.forEach(function (answer, index) {
                if (!users[answer.user])
                    users[answer.user] = {};

                if (!users[answer.user].score) {
                    users[answer.user].score = answer.score;
                }

                else {
                    users[answer.user].score += answer.score;
                }
            });

            var output = [];
            Object.keys(users).forEach(function (user) {
                output.push({
                    name : user,
                    active_quiz : users[user].active_quiz,
                    active_question : users[user].active_question,
                    score : users[user].score
                })
            });

            RestHelper.sendJsonResponse(res, 200, output);
        }).catch(function (err) {
            RestHelper.sendJsonResponse(res, 400, err);
        });
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    })
}

module.exports = {
    createAnswer : createAnswer,
    getAnswersByQuiz : getAnswersByQuiz,
    getAnswersByGroup : getAnswersByGroup
};