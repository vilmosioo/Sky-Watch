'use strict';

angular.module('ngApp')
	.controller('SearchController', function SearchCtrl($scope, $rootScope, $sanitize, Sky, Converter) {
		$scope.search = '';
		$scope.items = [];
		$scope.submit = function(){
			if($scope.search && $scope.search.length){
				$scope.items = Sky.searchItems({
					q : $sanitize($scope.search)
				});
			} else {
				$scope.items = [];
			}
		};
		var positionWatch = $rootScope.$watch('position', function(position){
			if(position){
				$scope.$watch('items', Converter.convertAll, true);
				positionWatch();
			}
		});
	});
