'use strict';

angular.module('ngApp')
  .directive('menu', function isLoading() {
    return {
      templateUrl: 'views/templates/menu.html',
      replace: true,
      restrict: 'E',
      scope: {},
      controller: function($scope){
        $scope.menu = {
          active: 0,
          items: [
            {
              href: '/',
              label: 'Home'
            },
            {
              href: '/browse',
              label: 'Browse'
            }
          ]
        };
      }
    };
  });