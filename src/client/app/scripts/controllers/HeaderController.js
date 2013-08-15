'use strict';

angular.module('ngApp')
	.controller('HeaderController', function HeaderController($scope) {
		$scope.menu = [
			{
				label: 'Home',
				href: '/#/'
			},
			{
				label: 'About',
				href: '/#/about/'
			},
			{
				label: 'Search',
				href: '/#/search/'
			}
		];
	});
