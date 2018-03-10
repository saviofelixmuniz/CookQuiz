/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('AdmCtrl', function ($scope, $rootScope, $state, Quiz, Groups) {
    $rootScope.managingQuiz = undefined;

    $scope.params = {
        active : null,
        showGroupInput : false
    };

    init();

    async function init() {
        $scope.quizes = await loadQuizes();
        $scope.groups = await loadGroups();
        $scope.quizes.forEach(function (quiz, index) {
           if (quiz.active)
               $scope.params.active = index;
        });
        $scope.$apply();
    }

    async function loadGroups() {
        var groups = undefined;
        await Groups.getAll().then(function (res) {
            groups = res.data;
            return groups;
        });

        return groups;
    }

    async function loadQuizes() {
        var quizes = undefined;

        await Quiz.getAll().then(function (res) {
            quizes = res.data;
            return quizes;
        });

        return quizes;
    }

    $scope.deactivateAll = function () {
        Quiz.deactivateAll().then(function () {
            $scope.params.active = null;
        });
    };

    $scope.createQuiz = function () {
        $state.go('create')
    };

    $scope.manageQuiz = function (index) {
        $rootScope.managingQuiz = $scope.quizes[index];
        $state.go('create');
    };

    $scope.setActive = function (index) {
        var quizId = $scope.quizes[index]._id;
        Quiz.setActive(quizId).then(function () {
            $scope.activeQuiz = index;
            console.log('..set active successfully');
        });
    };
    
    $scope.manageGroup = function (group) {
        $state.go('group', {id : group._id});
    };

    $scope.createGroup = function (groupName) {
        Groups.create({name : groupName}).then(function (group) {
            $scope.params.showGroupInput = false;
            $scope.groups.push(group.data);
            $scope.groupName = '';
        });
    };
    
    $scope.duplicate = function (index) {
        var quiz = $scope.quizes[index];
        delete quiz._id;
        Quiz.create(quiz).then(async function () {
            init();
        });
    }
});