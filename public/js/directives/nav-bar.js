/**
 * @author Sávio Muniz
 */
angular.module('CookinQuiz')
.directive('navBar', function () {
   return {
       templateUrl: '/templates/directives/nav-bar.html',
       scope: {
           title : '=ngValue'
       }
   }
});