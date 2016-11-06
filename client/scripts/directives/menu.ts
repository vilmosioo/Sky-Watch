/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
  .directive('menu', function isLoading() {
    return {
      templateUrl: '/views/templates/menu.html',
      replace: true,
      restrict: 'E',
      scope: {},
      controller: function($scope){
        $scope.menu = [
          'Home',
          'Browse'
        ];
      }
    };
  });