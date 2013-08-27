'use strict';

angular.module('ngApp')
  .directive('card', function card() {
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

          var RA = 0, DE = 0;

          angular.forEach($scope.item.ephemerids, function(ephemerid){
            RA += parseInt(ephemerid.RAh, 10) + parseInt(ephemerid.RAm, 10) / 60 + parseFloat(ephemerid.RAs, 10) / 3600;
            DE += parseInt(ephemerid.DEd, 10) + parseInt(ephemerid.DEm, 10) / 60 + parseFloat(ephemerid.Des, 10) / 3600;

            $scope.item.constelation = ephemerid.constellation;
          });

          RA /= $scope.item.ephemerids.length;
          DE /= $scope.item.ephemerids.length;

          $scope.item.RAh = Math.floor(RA);
          $scope.item.RAm = Math.floor((RA - Math.floor(RA)) * 60);
          $scope.item.RAs = Math.floor((RA - $scope.item.RAh - $scope.item.RAm / 60) * 3600);

          $scope.item.DEd = Math.floor(DE);
          $scope.item.DEm = Math.floor((DE - Math.floor(DE)) * 60);
          $scope.item.DEs = Math.floor((DE - $scope.item.DEd - $scope.item.DEm / 60) * 3600);
        }
      }
    };
  });