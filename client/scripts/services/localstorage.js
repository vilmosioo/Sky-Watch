/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
	.factory('LocalStorage', function ($window) {
		return $window.localStorage;
	});