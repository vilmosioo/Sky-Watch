'use strict';

var app = angular.module('ngApp', ['ngSanitize', 'Constants']);

var _load = function(){
	// Angular has been set up, run manual boostrap
	angular.element(document).ready(function bootstrap() {
		angular.bootstrap(document, ['ngApp']);
	});
};

// Load global services/directives etc.
$LAB.script('/scripts/main.js').wait(function mainLoaded(){
	// wait for all dependencies to resolve, then boostrap
	if(app.dependencies){
		app.dependencies.wait(_load);
	} else {
		_load();
	}
});

// Initial configuration
app.config(function appConfig($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
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
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController',
			title: 'Home',
			resolve: _requireDependencies(['/scripts/controllers/MainController.js'])
		})
		.when('/search/', {
			templateUrl: 'views/main.html',
			controller: 'SearchController',
			title: 'Search',
			resolve: _requireDependencies(['/scripts/controllers/SearchController.js'])
		})
		.when('/about/', {
			templateUrl: 'views/about.html',
			controller: 'AboutController',
			title: 'About',
			resolve: _requireDependencies(['/scripts/controllers/AboutController.js'])
		})
		.otherwise({
			redirectTo: '/'
		});
});
