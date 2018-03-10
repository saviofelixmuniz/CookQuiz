/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('GroupCtrl', function ($scope, $state, $location, Answers) {
    if (!$location.search().id)
        $state.go('adm');

    var groupId = $location.search().id;

    function loadAnswers() {
        Answers.getByGroup(groupId).then(function (res) {
            var users = res.data;
            users.sort(function (a,b) {
                return b.score - a.score;
            });
            $scope.users = users;
        });
    }

    loadAnswers();

    $scope.goBack = function () {
        $state.go('adm');
    };
    
    $scope.startUserEdit = function (userIndex) {
        var user = $scope.users[userIndex];
        user.editing = true;
        user.oldName = user.name;
        console.log($scope.users[userIndex]);
    };
    
    $scope.saveUserEdit = function (userIndex) {
        var user = $scope.users[userIndex];
        user.editing = false;
        Answers.updateAnswers(user.oldName, user.name).then(function () {
            loadAnswers();
        });
    };
    
    $scope.deleteUser = function (userIndex) {
        var user = $scope.users[userIndex];
        if (confirm("Deletar " + user.name + "?")) {
            Answers.deleteStatus(user.name).then(function () {
                alert('Usuário removido');
                loadAnswers();
            }, function (err) {
                alert('Esse usuário não pode ser removido porque já tem resposta');
            });
        }
    }
    
    
});