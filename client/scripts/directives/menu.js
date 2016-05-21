'use strict';

angular.module('ngApp')
  .directive('menu', function isLoading() {
    return {
      templateUrl: '/views/templates/menu.html',
      replace: true,
      restrict: 'E',
      scope: {},
      controller: function($scope, $rootScope, $location){
        $scope.menu = [
          'Home',
          'Browse'
        ];
      }
    };
  });