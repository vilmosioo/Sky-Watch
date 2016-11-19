
angular.module('ngApp')
	.factory('Geo', function ($q, $timeout) {
		var defer = $q.defer();
		if(navigator && navigator.geolocation){
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
		} else {
			defer.reject('Browser does not support location service.');
		}

		return {
			locate: function () {
				return defer.promise;
			}
		};
	});