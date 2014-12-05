'use strict';

angular.module('ngApp')
	.factory('LocalStorage', function ($window) {
		return $window.localStorage;
	});