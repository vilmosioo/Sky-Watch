'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $sanitize, Sky) {
		$scope.search = '';

		$scope.results = {
			items: [],
			isloading: false
		};

		// search function
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				$scope.results.isloading = true;
				$scope.results.items = [];

				Sky.searchItems({
					q : $sanitize($scope.search)
				})
				.then(function(obj){
					$scope.results.isloading = false;
		      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
		        $scope.results.items.push(obj.data.results[i]);
		      }
		    }, function(data, status, headers, config){
					$scope.results.isloading = false;
		      console.log('error', data, status, headers, config);
		    });
			} else {
				$scope.results.items = [];
			}
		};
	});
