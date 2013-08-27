'use strict';

angular.module('ngApp')
  .directive('isLoading', function isLoading() {
    return {
      template: '<div class="isloading"></div>',
      replace: true,
      restrict: 'E',
      scope: {
        flag : '='
      },
      link: function(scope, element) {
        scope.$watch('flag', function(val){
          element.css('display', val ? 'block' : 'none');
        });
      }
    };
  });