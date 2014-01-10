'use strict';

angular.module('ngApp').dependencies =
	$LAB
		.script('/scripts/config/config.js')
		.script('/scripts/controllers/HeaderController.js')
		.script('/scripts/directives/card.js')
		.script('/scripts/directives/cards.js')
		.script('/scripts/directives/menu.js')
		.script('/scripts/directives/isloading.js')
		.script('/scripts/services/converter.js')
		.script('/scripts/services/localstorage.js')
		.script('/scripts/services/modernizr.js')
		.script('/scripts/services/time.js')
		.script('/scripts/services/sky.js')
		.script('/scripts/services/geo.js')
		.script('/scripts/filters/degrees.js');