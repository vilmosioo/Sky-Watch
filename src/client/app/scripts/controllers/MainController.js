'use strict';

angular.module('ngApp')
	.controller('MainController', function MainCtrl($scope, Sky) {
		$scope.results = {
      items: [],
      isloading: true
    };

    // get objects
    Sky.getItems({limit : 10}).then(function(obj){
      $scope.results.isloading = false;
      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
        $scope.results.items.push(obj.data.results[i]);
      }
    }, function(data, status, headers, config){
      $scope.results.isloading = false;
      console.log('error', data, status, headers, config);
    });
	});
