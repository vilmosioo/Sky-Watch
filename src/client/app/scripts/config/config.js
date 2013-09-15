'use strict';

angular.module('ngApp')
  .run(function Run($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.pageTitle = route.$$route.title || '';
      $rootScope.search = $location.search().q || '';
    });
  });
