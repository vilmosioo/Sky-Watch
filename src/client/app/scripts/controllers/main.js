'use strict';

angular.module('ngApp')
	.controller('MainCtrl', function MainCtrl($scope, $sanitize, Sky) {
		$scope.items = Sky.getItems({
			limit : 10
		});
		$scope.$watch('search', function(val){
			if(val){
				$scope.items = Sky.searchItems({
					q : $sanitize(val)
				});
			}
		});
	});
