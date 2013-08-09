'use strict';

angular.module('ngApp')
	.controller('MainCtrl', function MainCtrl($scope, $sanitize, Sky, Converter) {
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
		// Converter.convert(0, 0);
	});
