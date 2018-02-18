/**
 * @author Sávio Muniz
 */

const Status = require('../models/status');
const RestHelper = require('../helpers/rest-helper');

function upsertStatus(req, res) {
    Status.update({ user: req.body.user }, req.body, { upsert: true }).then(function (status) {
        console.log(status);
        RestHelper.sendJsonResponse(res,201, status);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res,400, err);
    })
}

function checkUserExistence(req, res) {
    Status.find(req.body).then(function (data) {
        RestHelper.sendJsonResponse(res,200, data);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res,400, err);
    })
}

module.exports = {
    upsertStatus : upsertStatus,
    checkUserExistence : checkUserExistence
};

