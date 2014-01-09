'use strict';

angular.module('ngApp')
  .run(function Run($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.pageTitle = route.$$route.title || '';
      $rootScope.search = $location.search().q || '';
    });
  })
  .run(function($rootScope, Geo){
    Geo.locate().then(function (position) {
      $rootScope.position = position.coords;
    });
  });