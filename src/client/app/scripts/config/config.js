'use strict';

angular.module('ngApp')
  .run(function Run($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.pageTitle = route.$$route.title || '';
    });
  })
  .constant('Constants', {
    searchUrl: 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1/search',
    ngcUrl: 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1'
  });
