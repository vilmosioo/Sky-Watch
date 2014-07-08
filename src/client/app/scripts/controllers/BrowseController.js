'use strict';

angular.module('ngApp')
	.controller('BrowseController', function BrowseCtrl($scope, Sky) {
		var _load = function(){
			// do no load if already loading
			if($scope.results.isloading){
				return;
			}

			$scope.results.isloading = true;

			Sky.random().then(function(results){
				$scope.results.isloading = false;
				for(var i = 0; angular.isArray(results) && i < results.length; i++){
					$scope.results.items.push(results[i]);
				}
			}, function(data, status, headers, config){
				$scope.results.isloading = false;
				console.log('error', data, status, headers, config);
			});
		};

		$scope.results = {
			items: [],
			isloading: false,
			load: _load,
			more: false
		};
	});