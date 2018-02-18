/**
 * @author Sávio Muniz
 */
angular.module("CookinQuiz").factory('Groups', function ($http) {
    return {
        create : function (group) {
            return $http.post(API_BASE_PATH + "/groups", group, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getAll : function () {
            return $http.get(API_BASE_PATH + "/groups");
        }
    }
});