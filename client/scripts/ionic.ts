/// <reference path="../../typings/index.d.ts" />

interface Window {
	StatusBar: any;
	plugins: any;
}

angular.module('ngAppIonic', ['ionic', 'ngCordova'])
	.run(function ionicRun($ionicPlatform, $cordovaSplashscreen) {
		$ionicPlatform.ready(function() {
			// todo
		});
	});
