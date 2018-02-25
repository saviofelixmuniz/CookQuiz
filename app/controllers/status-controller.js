/**
 * @author Sávio Muniz
 */

const Status = require('../models/status');
const Quiz = require('../models/quizes');
const Answers = require('../models/answers');
const RestHelper = require('../helpers/rest-helper');

function upsertStatus(req, res) {
    Status.update({ user: req.body.user, group: req.body.group }, req.body, { upsert: true }).then(function (status) {
        RestHelper.sendJsonResponse(res,201, status);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res,400, err);
    })
}

function checkUserExistence(req, res) {
    Status.find(req.body).then(function (data) {
        if (data.length === 0) {
            Quiz.find({title : req.body.quiz}).then(function (quiz) {
                Answers.find({quiz : quiz[0]._id, user : req.body.user}).then(function (data) {
                    RestHelper.sendJsonResponse(res,200, data);
                });
            });
        }
        else
            RestHelper.sendJsonResponse(res,200, data);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res,400, err);
    })
}

module.exports = {
    upsertStatus : upsertStatus,
    checkUserExistence : checkUserExistence
};

