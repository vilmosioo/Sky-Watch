'use strict';

angular.module('ngApp')
  .directive('menu', function isLoading() {
    return {
      templateUrl: 'views/templates/menu.html',
      replace: true,
      restrict: 'E',
      scope: {},
      controller: function($scope, $rootScope, $location){
        $scope.menu = {
          active: 0,
          items: [
            {
              href: '/#/',
              label: 'Home'
            },
            {
              href: '/#/browse/',
              label: 'Browse'
            }
          ]
        };

        var hashLength = '/#'.length;

        $rootScope.$on('$routeChangeSuccess', function() {
          var path = $location.path();
          $scope.menu.active = -1;
          for(var i = 0, l = $scope.menu.items.length; i<l; i++){
            if(path === $scope.menu.items[i].href.substring(hashLength)){
              $scope.menu.active = i;
            }
          }
        });
      }
    };
  });