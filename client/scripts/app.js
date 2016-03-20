'use strict';

var app = angular.module('ngApp', ['ngSanitize', 'ngAnimate', 'Constants', 'ngRoute', 'angulartics', 'angulartics.google.analytics', 'ionic', 'ngCordova']);

// Initial configuration
app.run(function ionicRun($ionicPlatform, $cordovaSplashscreen) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.navigator && window.navigator.splashscreen) {
			window.plugins.orientationLock.unlock();
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		if (window.cordova){
			// Hide Splash Screen when App is Loaded
			$cordovaSplashscreen.hide();
		}
	});
});
app.config(function appConfig($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider) {
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
			templateUrl: '/views/main.html',
			controller: 'MainController',
			title: 'Home',
			resolve: _requireDependencies(['/scripts/controllers/MainController.js'])
		})
		.when('/search/', {
			templateUrl: '/views/main.html',
			controller: 'SearchController',
			title: 'Search',
			resolve: _requireDependencies(['/scripts/controllers/SearchController.js'])
		})
		.when('/browse/', {
			templateUrl: '/views/main.html',
			controller: 'BrowseController',
			title: 'Browse',
			resolve: _requireDependencies(['/scripts/controllers/BrowseController.js'])
		})
		.when('/about/', {
			templateUrl: '/views/about.html',
			controller: 'AboutController',
			title: 'About',
			resolve: _requireDependencies(['/scripts/controllers/AboutController.js'])
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
