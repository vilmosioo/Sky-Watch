'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $rootScope, Constants, $sanitize, $location, Sky) {
		var _load = function(){
			// do no load if already loading
      if($scope.results.isloading){
        return;
      }

      $scope.results.isloading = true;
			Sky.searchItems({q: $sanitize($rootScope.global.search), limit: Constants.DEFAULT_LIMIT, offset: $scope.results.items.length})
			.then(function(obj){
				$scope.results.isloading = false;
				for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
	        $scope.results.items.push(obj.data.results[i]);
	      }
	      $scope.results.more = $scope.results.items.length < obj.data.total;
	    }, function(data, status, headers, config){
				$scope.results.isloading = false;
	      console.log('error', data, status, headers, config);
	    });
		};

		$scope.results = {
			items: [],
			isloading: false,
      load: _load,
      more: true
		};

	});