/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('HomeCtrl', function ($scope, $state) {
    $scope.showPassword = false;
    $scope.mismatch = false;
    
    $scope.login = function (password) {
        if (password === '20092014')
            $state.go('adm');
        else
            $scope.mismatch = true;
    };

    $scope.goToQuiz = function () {
        $state.go('quiz');
    }
});