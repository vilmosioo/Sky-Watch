'use strict';

angular.module('ngApp')
  .directive('cards', function cards($window, $interval, $timeout, $rootScope, Constants, Converter, Geo, SunCalc) {
    return {
      templateUrl: '/views/templates/cards.html',
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
          limit: Constants.DEFAULT_LIMIT,
					show_moon: false
        }, $scope.config);

				var computeMoonPosition = function(){
					if($scope.config.show_moon){
						Geo.locate().then(function(position){
							var pos = SunCalc.getMoonPosition(new Date(), position.coords.latitude, position.coords.longitude);
							$scope.moon.az = pos.azimuth * 180 / Math.PI;
							$scope.moon.alt = pos.altitude * 180 / Math.PI;
						});
					}
				};

				// set up moon object
				if($scope.config.show_moon){
					var illumination = SunCalc.getMoonIllumination(new Date());
					$scope.moon = {
						names: ['Moon'],
						illumination: {
							phase: illumination.phase,
							isWaxing: illumination.angle < 0
						}
					};

					computeMoonPosition();
				}

        // calculate local coordinates
        var interval;
        var positionWatch = $rootScope.$watch('position', function(position){
          if(position){
            if(interval){
              $interval.cancel(interval);
            }
            var _calc = function(){
              Converter.convertAll($scope.list.items);
							computeMoonPosition();
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