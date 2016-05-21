'use strict';

angular.module('ngApp')
  .run(function Run($rootScope, $location) {
    $rootScope.global = {
      pageTitle: '',
      version: '@@version',
      search: ''
    };
    
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.global.pageTitle = route.$$route.title || '';
      $rootScope.global.search = $location.search().q || '';
    });
  })
  .run(function($rootScope, Geo){
    Geo.locate().then(function (position) {
      $rootScope.position = position.coords;
    });
  });