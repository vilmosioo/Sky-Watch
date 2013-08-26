'use strict';

angular.module('ngApp')
	.controller('MainController', function MainCtrl($scope, $rootScope, Sky, Converter) {
		$scope.items = [];
    $scope.isloading = true;

    // get objects
    Sky.getItems({limit : 10}).then(function(obj){
      $scope.isloading = false;
      for(var i = 0; angular.isArray(obj.data.results) && i < obj.data.results.length; i++){
        $scope.items.push(obj.data.results[i]);
      }
    }, function(data, status, headers, config){
      $scope.isloading = false;
      console.log('error', data, status, headers, config);
    })

    // calculate local coordinates
    var positionWatch = $rootScope.$watch('position', function(position){
			if(position){
				$scope.$watch('items', Converter.convertAll, true);
				positionWatch();
			}
		});
	});
