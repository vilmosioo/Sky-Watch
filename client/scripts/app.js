'use strict';

var app = angular.module('ngApp', ['ngSanitize', 'ngAnimate', 'Constants', 'ui.router', 'angulartics', 'angulartics.google.analytics', 'ngAppIonic']);

// Initial configuration
app.config(function appConfig($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider) {
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
			templateUrl: '/views/main.html',
			controller: 'MainController',
			name: 'Home',
			resolve: _requireDependencies(['/scripts/controllers/MainController.js'])
		})
		.state({
			url: '/search?q',
			templateUrl: '/views/main.html',
			controller: 'SearchController',
			name: 'Search',
			resolve: _requireDependencies(['/scripts/controllers/SearchController.js'])
		})
		.state({
			url: '/browse/',
			templateUrl: '/views/main.html',
			controller: 'BrowseController',
			name: 'Browse',
			resolve: _requireDependencies(['/scripts/controllers/BrowseController.js'])
		})
		.state({
			url: '/about/',
			templateUrl: '/views/about.html',
			controller: 'AboutController',
			name: 'About',
			resolve: _requireDependencies(['/scripts/controllers/AboutController.js'])
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
