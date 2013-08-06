'use strict';

angular.module('ngApp')
	.controller('MainCtrl', function MainCtrl($scope, $sanitize, Sky) {
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
	});
