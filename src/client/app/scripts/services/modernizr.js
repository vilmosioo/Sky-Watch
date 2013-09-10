'use strict';

angular.module('ngApp')
	.factory('Modernizr', function ($window) {
		return $window.Modernizr;
	});