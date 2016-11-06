/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
	.factory('SunCalc', function ($window) {
		return $window.SunCalc || {};
	});
