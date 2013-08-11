'use strict';

angular.module('ngApp')
	.controller('MainCtrl', function MainCtrl($scope, $sanitize, $timeout, Sky, Converter, Geo) {
		$scope.search = '';
		$scope.items = Sky.getItems({
			limit : 10
		});
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				$scope.items = Sky.searchItems({
					q : $sanitize($scope.search)
				});
			}
		};
		
		$scope.position = null;
		Geo.locate().then(function (position) {
           		$scope.position = position.coords;
           		$scope.$watch('items', function(items){
	        		for (var i = items.length - 1; i >= 0; i--) {
	        			var localPos = Converter.convert({
	        				RA: (parseFloat(items[i].RAh) || 0) + (parseFloat(items[i].RAm) || 0) / 60 + (parseFloat(items[i].RAs) || 0) / 3600, 
	        				DE: (parseFloat(items[i].DEd) || 0) + (parseFloat(items[i].DEm) || 0) / 60 + (parseFloat(items[i].DEs) || 0) / 3600
	        			}, $scope.position);
	        			items[i].az = localPos.az;
	        			items[i].alt = localPos.alt;
	        		};
		        }, true);
            });
	});
