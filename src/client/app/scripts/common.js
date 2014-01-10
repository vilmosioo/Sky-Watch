'use strict';

require([
		'config/config',
		'controllers/HeaderController',
		'directives/card',
		'directives/cards',
		'directives/menu',
		'directives/isloading',
		'services/converter',
		'services/localstorage',
		'services/modernizr',
		'services/time',
		'services/sky',
		'services/geo',
		'filters/degrees'
	], function boostrap(){
		// Angular has been set up, run manual boostrap
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['ngApp']);
		});
	}
);