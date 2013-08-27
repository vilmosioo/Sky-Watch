'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $sanitize, Sky) {
		$scope.search = '';

		var _load = function(){
			// do no load if already loading
      if($scope.results.isloading){
        return;
      }

      $scope.results.isloading = true;
			Sky.searchItems({q: $sanitize($scope.search), limit: 5, offset: $scope.results.items.length})
			.then(function(obj){
				$scope.results.isloading = false;
	      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
	        $scope.results.items.push(obj.data.results[i]);
	      }
	    }, function(data, status, headers, config){
				$scope.results.isloading = false;
	      console.log('error', data, status, headers, config);
	    });
		};

		$scope.results = {
			items: [],
			isloading: false,
      load: _load
		};

		// search function
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				$scope.results.items = [];
				$scope.results.load();
			} else {
				$scope.results.items = [];
			}
		};
	});
