require(['config/constants'], function requireApp(){
  'use strict';

  var app = angular.module('ngApp', ['ngSanitize', 'Constants']);

  // Load global services/directives etc. then boostrap
  require([
    'config/config',
    'controllers/HeaderController',
    'directives/card',
    'directives/cards',
    'directives/menu',
    'directives/isloading',
    'services/converter',
    'services/localstorage',
    'services/modernizr',
    'services/time',
    'services/sky',
    'services/geo',
    'filters/degrees'
  ], function boostrap(){
    // Manual boostrap
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['ngApp']);
    });
  });

  // Initial configuration    
  app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    // Save providers for future use
    app.controllerProvider = $controllerProvider;
    app.compileProvider = $compileProvider;
    app.routeProvider = $routeProvider;
    app.filterProvider = $filterProvider;
    app.provide = $provide;

    // require controller tempplate function
    var _requireDependencies = function(dependencies){
      return {
        resolvedData: function requireMain($q, $timeout){
          var defer = $q.defer();
          require(dependencies, function requireMain(){
            $timeout(defer.resolve);
          });
          return defer.promise;
        }
      };
    };

    // Register routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        title: 'Home',
        resolve: _requireDependencies(['controllers/MainController'])
      })
      .when('/search/', {
        templateUrl: 'views/main.html',
        controller: 'SearchController',
        title: 'Search',
        resolve: _requireDependencies(['controllers/SearchController'])
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        title: 'About',
        resolve: _requireDependencies(['controllers/AboutController'])
      })
      .otherwise({
        redirectTo: '/'
      });
  });
});