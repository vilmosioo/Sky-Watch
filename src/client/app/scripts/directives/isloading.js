'use strict';

angular.module('ngApp')
  .directive('isLoading', function isLoading() {
    return {
      template: '<div ng-show="more" ng-class="{isloading:flag}" class="loadmore clear"><a>Load more</a><span class="loader"></span></div>',
      replace: true,
      restrict: 'E',
      scope: {
        flag : '=',
        handler: '=',
        more: '='
      },
      link: function($scope, elem){
        if(typeof $scope.handler === 'function'){
          elem.bind('click', $scope.handler);
          $scope.$on('$destroy', function(){
            return elem.unbind('click', $scope.handler);
          });
        }
      }
    };
  });