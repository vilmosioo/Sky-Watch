require(['config/constants'], function requireApp(){
  'use strict';

  var app = angular.module('ngApp', ['ngSanitize', 'Constants']);

  // Load global services/directives etc. then boostrap

  require(['common']);

  // Initial configuration    
  app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    // Redefine providers.
    app._controller = app.controller;
    app._service = app.service;
    app._factory = app.factory;
    app._directive = app.directive;

    // Provider-based controller.
    app.controller = $controllerProvider.register;
    app.service = $provide.service;
    app.factory = $provide.factory;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;

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