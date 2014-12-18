'use strict';

angular.module('ngApp')
	.directive('phase', function card() {
		return {
			restrict: 'A',
			scope: {
				phase : '='
			},
			link: function(scope, element){
				console.log(element);
			}
		};
	});