'use strict';

angular.module('ngApp')
  .directive('cards', function cards($window, $timeout, $rootScope, Converter) {
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
            setInterval(function(){
              var phase = $scope.$root.$$phase;
              if(phase !== '$apply' && phase !== '$digest') {
                $scope.$apply(function(){
                  Converter.convertAll($scope.list.items);  
                });
              }  
            }, 1000);
            positionWatch();
          }
        });
      }
    };
  });