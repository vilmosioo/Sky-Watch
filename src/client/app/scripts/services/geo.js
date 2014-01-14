'use strict';

angular.module('ngApp')
	.factory('Geo', function ($q, $timeout) {
		var defer = $q.defer();
		navigator.geolocation.getCurrentPosition(
			function (position) {
				$timeout(function(){
					defer.resolve(position);
				});
			},
			function(error) {
				$timeout(function(){
					defer.reject(error);
				});
			}
		);

		return {
			locate: function () {
				return defer.promise;
			}
		};
	});