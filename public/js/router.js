/**
 * @author Sávio Muniz
 */

angular.module('CookinQuiz').config(function($stateProvider,$urlRouterProvider, $locationProvider) {
    const home = {
        name : 'home',
        url : '/',
        templateUrl : '/templates/pages/home.html',
        controller : 'HomeCtrl'
    };

    const adm = {
        name : 'adm',
        url : '/adm',
        templateUrl : '/templates/pages/adm.html',
        controller : 'AdmCtrl'
    };

    const create = {
        name : 'create',
        url : '/create',
        templateUrl : '/templates/pages/create-quiz.html',
        controller : 'CreateQuizCtrl'
    };

    const group = {
        name : 'group',
        url : '/group?id',
        templateUrl : '/templates/pages/group.html',
        controller : 'GroupCtrl'
    };

    const quiz = {
        name : 'quiz',
        url : '/quiz',
        templateUrl : '/templates/pages/quiz.html',
        controller : 'QuizCtrl'
    };

    $stateProvider
        .state(home)
        .state(adm)
        .state(create)
        .state(group)
        .state(quiz);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

});