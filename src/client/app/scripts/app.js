'use strict';

angular.module('ngApp', ['ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/search/', {
        templateUrl: 'views/search.html',
        controller: 'SearchController'
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, Geo){
    Geo.locate().then(function (position) {
      $rootScope.position = position.coords;
    });
  });
