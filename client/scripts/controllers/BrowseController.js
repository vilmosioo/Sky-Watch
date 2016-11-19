/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
	.controller('BrowseController', function BrowseCtrl($scope, Sky) {
		var _load = function(){
			// do no load if already loading
			if($scope.results.isloading){
				return;
			}

			$scope.results.isloading = true;
			Sky.random().then(function(obj){
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