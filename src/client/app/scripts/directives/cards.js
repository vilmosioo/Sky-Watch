'use strict';

angular.module('ngApp')
  .directive('cards', function cards($window, $rootScope, Converter) {
    return {
      templateUrl: 'views/templates/cards.html',
      replace: true,
      restrict: 'E',
      scope: {
        list: '=',
        config: '=?'
      },
      controller: function($scope){
        // set configuration option
        $scope.config = angular.extend({
          wrapClass: 'cards',
          grid: 5
        }, $scope.config);

        // calculate local coordinates
        var positionWatch = $rootScope.$watch('position', function(position){
          if(position){
            $scope.$watch('list.items', Converter.convertAll, true);
            positionWatch();
          }
        });
      },
      link: function($scope, elem){
        // check if the end of the list is visible, if it is, load more items
        var _handler = function() {
          var elemBottom = elem[0].getBoundingClientRect().bottom;
          if (elemBottom <= $window.innerHeight) {
            $scope.list.load();
          }
        };

        var $$window = angular.element($window);
        $$window.bind('scroll', _handler);

        // disable listener when scope is destroyed
        $scope.$on('$destroy', function() {
          return $$window.unbind('scroll', _handler);
        });
      }
    };
  });