'use strict';

angular.module('ngApp')
  .directive('cards', function cards($window, $timeout, $rootScope, Constants, Converter) {
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
          grid: 5,
          limit: Constants.DEFAULT_LIMIT
        }, $scope.config);

        // calculate local coordinates
        var positionWatch = $rootScope.$watch('position', function(position){
          if(position){
            var _calc = function(){
              Converter.convertAll($scope.list.items);
              $timeout(_calc, 1000);
            };
            _calc();
            positionWatch();
          }
        });

        var weatherWatch = $rootScope.$watch('weather', function(weather){
          if(weather){
            $scope.weather = weather;
            weatherWatch();
          }
        });

        $scope.$on('$destroy', function(){
          positionWatch();
          weatherWatch();
        });
      }
    };
  });