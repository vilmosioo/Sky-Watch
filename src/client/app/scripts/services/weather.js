'use strict';

angular.module('ngApp')
	.factory('Weather', function ($q, $http, Geo, Constants) {
		var defer = $q.defer();

		Geo.locate().then(function(position){
			$http.jsonp(Constants.WEATHER_URL+'?lat='+position.coords.latitude+'&lon=' + position.coords.longitude + '&callback=JSON_CALLBACK')
				.then(function(response){
					defer.resolve(response.data);
				}, defer.reject);
		}, defer.reject);

		return {
			get: function(){
				return defer.promise;
			}
		};
	});
