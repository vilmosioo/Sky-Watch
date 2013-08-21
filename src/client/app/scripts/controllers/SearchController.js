'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $rootScope, $sanitize, Sky, Converter) {
		$scope.search = '';
		$scope.items = [];

		// search function
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				Sky.searchItems({
					q : $sanitize($scope.search)
				})
				.then(function(obj){
		      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
		        $scope.items.push(obj.data.results[i]);
		      }
		    }, function(data, status, headers, config){
		      console.log('error', data, status, headers, config);
		    });
			} else {
				$scope.items = [];
			}
		};

		// calculate local coordinates
		var positionWatch = $rootScope.$watch('position', function(position){
			if(position){
				$scope.$watch('items', Converter.convertAll, true);
				positionWatch();
			}
		});
	});
