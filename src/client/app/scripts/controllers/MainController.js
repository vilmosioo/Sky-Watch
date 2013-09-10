'use strict';

angular.module('ngApp')
	.controller('MainController', function MainCtrl($scope, Sky) {

		// load objects
    var _load = function(){
      // do no load if already loading
      if($scope.results.isloading){
        return;
      }

      $scope.results.isloading = true;

      // call apply to ensure load icon is visible
      var phase = $scope.$root.$$phase;
      if(phase !== '$apply' && phase !== '$digest') {
        $scope.$apply();
      }

      Sky.getItems({limit: 5, offset: $scope.results.items.length}).then(function(results){
        $scope.results.isloading = false;
        for(var i = 0; angular.isArray(results) && i < results.length; i++){
          $scope.results.items.push(results[i]);
        }
      }, function(data, status, headers, config){
        $scope.results.isloading = false;
        console.log('error', data, status, headers, config);
      });
    };

    $scope.results = {
      items: [],
      isloading: false,
      load: _load
    };

    $scope.results.load();
	});
