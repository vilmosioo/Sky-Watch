'use strict';

angular.module('ngApp')
	.controller('MainCtrl', function MainCtrl($scope, Sky) {
		$scope.items = Sky.getItems({
			limit : 10
		});
	});
