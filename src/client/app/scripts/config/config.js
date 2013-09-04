'use strict';

angular.module('ngApp')
  .run(function Run($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.pageTitle = route.$$route.title || '';
    });
  });
