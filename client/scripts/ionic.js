'use strict';

angular.module('ngAppIonic', ['ionic', 'ngCordova'])
	.run(function ionicRun($ionicPlatform, $cordovaSplashscreen) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.navigator && window.navigator.splashscreen) {
				window.plugins.orientationLock.unlock();
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
			if (window.cordova){
				// Hide Splash Screen when App is Loaded
				$cordovaSplashscreen.hide();
			}
		});
	});