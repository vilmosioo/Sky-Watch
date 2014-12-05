'use strict';

angular.module('ngApp')
  .controller('HeaderController', function HeaderController($scope, $rootScope, $sanitize, $location) {
    $scope.search = '';
    $rootScope.$watch('global.search', function(value){
      $scope.search = value;
    });

    // search function
    $scope.submit = function(){
      if($scope.search && $scope.search.length){
        $location.path('/search').search({ q: $sanitize($scope.search) });
      }
    };
  });
