/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('GroupCtrl', function ($scope, $state, $location, Answers) {
    if (!$location.search().id)
        $state.go('adm');

    var groupId = $location.search().id;

    Answers.getByGroup(groupId).then(function (res) {
        var users = res.data;
        users.sort(function (a,b) {
           return b.score - a.score;
        });
        $scope.users = users;
    });

    $scope.goBack = function () {
        $state.go('adm');
    }
});