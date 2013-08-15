'use strict';

angular.module('ngApp')
	.controller('MainController', function MainCtrl($scope, $rootScope, Sky, Converter) {
		$scope.items = Sky.getItems({limit : 10});
		var positionWatch = $rootScope.$watch('position', function(position){
			if(position){
				$scope.$watch('items', Converter.convertAll, true);
				positionWatch();
			}
		});
	});
