
angular.module('ngApp')
	.factory('SunCalc', function ($window) {
		return $window.SunCalc || {};
	});
