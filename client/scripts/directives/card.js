'use strict';

angular.module('ngApp')
  .directive('card', function card() {
    return {
      templateUrl: '/views/templates/card.html',
      replace: true,
      restrict: 'E',
      scope: {
        item : '='
      }
    };
  });