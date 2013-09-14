'use strict';

angular.module('ngApp', ['ngSanitize', "Constants"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        title: 'Home'
      })
      .when('/search/', {
        templateUrl: 'views/search.html',
        controller: 'SearchController',
        title: 'Search'
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        title: 'About'
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
