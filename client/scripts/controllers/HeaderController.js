/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
  .controller('HeaderController', function HeaderController($scope, $rootScope, $sanitize, $state) {
    $scope.search = '';
    $rootScope.$watch('global.search', function(value){
      $scope.search = value;
    });

    // search function
    $scope.submit = function(){
      if($scope.search){
        $state.go('Search', { q: $sanitize($scope.search) });
      }
    };
  });
