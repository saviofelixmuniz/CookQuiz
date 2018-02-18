/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('CreateQuizCtrl', function ($scope, $state, $rootScope, Groups, Answers, Quiz) {

    $scope.buttonClasses = {
        questionBtn: 'btn btn-primary btn-lg',
        answerBtn: 'btn btn-secondary btn-lg'
    };

    $scope.quiz ={};
    var updatingQuiz = false;

    init();

    function getNewQuestion() {
        return {
            _id : $scope.quiz.questions ? $scope.quiz.questions.length : 0,
            title: '',
            options : [
                '',
                ''
            ]
        };
    }
    function init() {
        Groups.getAll().then(function (res) {
            $scope.groups = res.data;
        });

        if ($rootScope.managingQuiz) {
            $scope.quiz = $rootScope.managingQuiz;
            Answers.getByQuiz($scope.quiz._id).then(function (res) {
                $scope.answers = res.data;
            });
            updatingQuiz = true;
        }
        else {
            $scope.quiz = {
                title : '',
                questions : [getNewQuestion()]
            };
        }
    }

    $scope.addOption = function (index) {
        if ($scope.quiz.questions[index].options.length < 5){
            $scope.quiz.questions[index].options.push('');
        }
    };

    $scope.addQuestion = function () {
        $scope.quiz.questions.push(getNewQuestion());
    };

    $scope.setTrueFalse = function (index) {
        $scope.quiz.questions[index].options[0] = 'Verdadeiro';
        $scope.quiz.questions[index].options[1] = 'Falso';
    };

    $scope.removeQuestion = function (index) {
        $scope.quiz.questions.splice(index,1);
    };

    $scope.saveQuiz = function () {
        $scope.quiz.questions.forEach(function (question) {
            delete question._id;
        });

        if (!updatingQuiz) {
            Quiz.create($scope.quiz).then(function () {
                $state.go('adm');
            });
        }

        else {
            var quizId = $scope.quiz._id;
            delete $scope.quiz._id;
            delete $scope.quiz.__v;
            Quiz.edit(quizId, $scope.quiz).then(function () {
                $state.go('adm');
            })
        }
    };
    
    $scope.$watchCollection('quiz.questions', function (newValue) {
       console.log(newValue);
    });

    $scope.showAnswers = function (isActive) {
        var answerBtnClass = $scope.buttonClasses.answerBtn;
        $scope.buttonClasses.answerBtn = $scope.buttonClasses.questionBtn;
        $scope.buttonClasses.questionBtn = answerBtnClass;
        $scope.answersDisplayed = isActive;
    };

    $scope.goBack = function () {
        $state.go('adm');
    };
});