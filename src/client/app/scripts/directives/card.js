'use strict'

angular.module('ngApp')
  .directive('card', function () {
    return {
      templateUrl: 'views/templates/card.html',
      replace: true,
      restrict: 'E',
      scope: {
        item : '='
      },
      controller : function($scope, $element, $attrs){
        console.log($scope, $element, $attrs);  
      }
    };  
  });
