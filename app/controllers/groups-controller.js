/**
 * @author Sávio Muniz
 */

const Groups = require('../models/groups');
const RestHelper = require('../helpers/rest-helper');

function createGroup(req, res) {
    var newGroup = req.body;

    Groups.create(newGroup).then(function (group) {
        RestHelper.sendJsonResponse(res, 200, group);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function getGroups(req, res) {
    Groups.find().then(function (groups) {
        RestHelper.sendJsonResponse(res, 200, groups);
    })
    .catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

module.exports = {
    createGroup : createGroup,
    getGroups : getGroups
};