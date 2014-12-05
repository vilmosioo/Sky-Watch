'use strict';

angular.module('ngApp')
  .directive('card', function card(Time) {
    return {
      templateUrl: 'views/templates/card.html',
      replace: true,
      restrict: 'E',
      scope: {
        item : '='
      },
      controller : function($scope){
        if(angular.isArray($scope.item.ephemerids) && $scope.item.ephemerids.length){
          $scope.item.names = [$scope.item.name];
          $scope.item.type = 'Planet';

          var closest = null;
          var now = Time.getJD();

          // find the ephemeris closest to current date/hour
          angular.forEach($scope.item.ephemerids, function(ephemerid){
            if(closest === null){
              closest = ephemerid;
            } else {
              if(Math.abs(parseFloat(closest.JD) - now) > Math.abs(parseFloat(ephemerid.JD) - now)){
                closest = ephemerid;
              }
            }
          });

          if(closest !== null){
            $scope.item.constelation = closest.constellation;

            $scope.item.RAh = parseInt(closest.RAh, 10);
            $scope.item.RAm = parseInt(closest.RAm, 10);
            $scope.item.RAs = parseFloat(closest.RAs, 10);

            $scope.item.DEd = parseInt(closest.DEd, 10);
            $scope.item.DEm = parseInt(closest.DEm, 10);
            $scope.item.DEs = parseFloat(closest.DEs, 10);
          }
        }
      }
    };
  });