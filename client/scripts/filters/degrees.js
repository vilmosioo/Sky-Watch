/// <reference path="../../../typings/index.d.ts" />

angular.module('ngApp')
	.filter('degrees', function() {
		return function(input, degrees) {
			input = parseFloat(input);
			degrees = degrees === 'hours' ? false : true;
			if(!degrees){
				input /= 15;
			}

			var d = Math.floor(input);
			var m = Math.floor((input - d) * 60);
			var s = Math.round((input - d - m / 60) * 60 * 100) / 100;
			return input ?
				(degrees ?
					d + 'd ' + m + 'm ' + s + 's' :
					d + 'h ' + m + 'm ' + s + 's') :
				'-';
		};
	});