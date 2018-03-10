/**
 * @author Sávio Muniz
 */
angular.module("CookinQuiz").factory('Answers', function RequestFactory($http) {
    return {
        create : function (answer) {
            return $http.post(API_BASE_PATH + "/answers", answer, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getByQuiz : function (quizId) {
            return $http.get(API_BASE_PATH + "/quiz/" + quizId + "/answers/");
        },

        getByGroup : function (groupId) {
            return $http.get(API_BASE_PATH + "/groups/" + groupId + "/answers");
        },

        createStatus : function (status) {
            return $http.post(API_BASE_PATH + "/status", status, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getStatus : function (status) {
            return $http.post(API_BASE_PATH + "/status/existence", status, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        updateAnswers: function (oldName, newName) {
            return $http.put(API_BASE_PATH + "/answers", {old_name : oldName, new_name : newName});
        },

        deleteStatus : function (user) {
            return $http.post(API_BASE_PATH + '/status/delete', {user : user},  { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        }
    }
});