/**
 * @author Sávio Muniz
 */
angular.module("CookinQuiz").factory('Quiz', function ($http) {
    return {
        create : function (quiz) {
            return $http.post(API_BASE_PATH + "/quiz", quiz, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        edit : function (quizId, quiz) {
            return $http.put(API_BASE_PATH + '/quiz/' + quizId, quiz, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },
        
        setActive : function (quizId) {
            return $http.put(API_BASE_PATH + '/quiz/' + quizId + '/active', null, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },

        getAll : function () {
            return $http.get(API_BASE_PATH + "/quiz/");
        },

        getActive : function () {
            return $http.get(API_BASE_PATH + '/quiz/active');
        },

        deactivateAll : function () {
            return $http.put(API_BASE_PATH + '/quiz/inactive/all');
        }

    }
});