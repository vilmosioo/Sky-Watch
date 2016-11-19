/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
	.factory('Modernizr', function ($window) {
		return $window.Modernizr;
	});