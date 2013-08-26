'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $rootScope, $sanitize, Sky, Converter) {
		$scope.search = '';
		$scope.items = [];
		$scope.isloading = false;

		// search function
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				$scope.isloading = true;
				$scope.items = [];

				Sky.searchItems({
					q : $sanitize($scope.search)
				})
				.then(function(obj){
					$scope.isloading = false;
		      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
		        $scope.items.push(obj.data.results[i]);
		      }
		    }, function(data, status, headers, config){
		    	$scope.isloading = false;
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
