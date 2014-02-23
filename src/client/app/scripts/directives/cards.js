'use strict';

angular.module('ngApp')
  .directive('cards', function cards($window, $interval, $timeout, $rootScope, Constants, Converter) {
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
        var interval;
        var positionWatch = $rootScope.$watch('position', function(position){
          if(position){
            if(interval){
              $interval.cancel(interval);
            }
            var _calc = function(){
              Converter.convertAll($scope.list.items);
            };
            interval = $interval(_calc, 1000);
            positionWatch();
          }
        });

        var weatherWatch = $rootScope.$watch('weather', function(weather){
          if(weather){
            $scope.weather = weather;
            weatherWatch();
          }
        });

        var listWatch = $scope.$watch('list', function(list){
          if(!!list){
            // required for animations to work
            $timeout(list.load);
            listWatch();
          }
        });

        $scope.$on('$destroy', function(){
          positionWatch();
          weatherWatch();
          listWatch();
          if(interval){
            $interval.cancel(interval);
          }
        });
      }
    };
  });