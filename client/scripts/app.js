'use strict';

var app = angular.module('ngApp', ['ngSanitize', 'ngAnimate', 'Constants', 'ui.router', 'angulartics', 'angulartics.google.analytics', 'ngAppIonic']);

// Initial configuration
app.config(function appConfig($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider) {
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
			resolvedData: ['$q', '$timeout', function($q, $timeout){
				var defer = $q.defer();
				$LAB.script(dependencies).wait(function requireMain(){
					$timeout(defer.resolve);
				});
				return defer.promise;
			}]
		};
	};

	// Register routes
	$stateProvider
		.state({
			url: '/',
			name: '/',
			templateUrl: '/views/main.html',
			controller: 'MainController',
			title: 'Home',
			resolve: _requireDependencies(['/scripts/controllers/MainController.js'])
		})
		.state({
			url: '/search/',
			name: '/search/',
			templateUrl: '/views/main.html',
			controller: 'SearchController',
			title: 'Search',
			resolve: _requireDependencies(['/scripts/controllers/SearchController.js'])
		})
		.state({
			url: '/browse/',
			name: '/browse/',
			templateUrl: '/views/main.html',
			controller: 'BrowseController',
			title: 'Browse',
			resolve: _requireDependencies(['/scripts/controllers/BrowseController.js'])
		})
		.state({
			url: '/about/',
			name: '/about/',
			templateUrl: '/views/about.html',
			controller: 'AboutController',
			title: 'About',
			resolve: _requireDependencies(['/scripts/controllers/AboutController.js'])
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
