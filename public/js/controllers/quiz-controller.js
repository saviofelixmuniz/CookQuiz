/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.controller('QuizCtrl', function ($state, $scope, Quiz, Answers, $localStorage) {
    $scope.params = {
        answer: null,
        rights: $localStorage.rights || 0,
        isOver: false
    };

    $scope.username = $localStorage.username || undefined;

    $scope.params.currentQuestion = $localStorage.currentQuestion || 0;

    Quiz.getActive().then(function (quiz) {
        $scope.quiz = quiz.data;
        $scope.question = $localStorage.currentQuestion ? $scope.quiz.questions[$scope.params.currentQuestion] : null;
    });

    function registerStatus() {
        Answers.createStatus({
            user : $scope.username,
            quiz : $scope.quiz.title,
            group : $scope.quiz.group,
            question : $scope.params.currentQuestion
        }).then(function (status) {
            console.log(status);
        })
    }

    $scope.start = function () {
        if ($scope.username) {
            Answers.getStatus({user : $scope.username, quiz : $scope.quiz.title}).then(function (status) {
                if (status.data.length > 0)
                    $scope.params.notAllowed = true;
                else {
                    $scope.question = $scope.quiz.questions[$scope.params.currentQuestion];
                    registerStatus();
                    $localStorage.question = $scope.question;
                    $localStorage.rights = $scope.params.rights;
                }
            });
        }
    };

    $scope.send = function (question, index) {
        if (question.correct === index)
            $scope.params.rights += 1;

        $scope.params.currentQuestion += 1;

        if ($scope.params.currentQuestion === $scope.quiz.questions.length) {
            $scope.params.currentQuestion = -1;
            $scope.params.isOver = true;
            var score = ($scope.params.rights / $scope.quiz.questions.length) * 10;
            $scope.params.score = parseFloat( score.toFixed(1) );
            registerAnswer($scope.params.score);
            $localStorage.$reset();
        }

        else {
            $localStorage.rights = $scope.params.rights;
            $localStorage.username = $scope.username;
            $localStorage.currentQuestion = $scope.params.currentQuestion;
            $scope.question = $scope.quiz.questions[$scope.params.currentQuestion];
            $scope.params.answer = null;
        }

        registerStatus();
    };

    $scope.goBack = function () {
        $state.go('home');
    };
    
    function registerAnswer(score) {
        Answers.create({
            user : $scope.username,
            quiz : $scope.quiz._id,
            score : score,
            group : $scope.quiz.group
        }).then(function (answer) {
            console.log(answer)
        });
    }
});