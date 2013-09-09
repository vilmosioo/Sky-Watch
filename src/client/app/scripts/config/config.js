'use strict';

angular.module('ngApp')
  .run(function Run($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.pageTitle = route.$$route.title || '';
    });
  })
  .constant('Constants', {
    SEARCH_URL: 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1/search',
    NGC_URL: 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1',
    ITEMS: 'sky_watch_items'
  });
