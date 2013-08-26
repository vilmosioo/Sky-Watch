'use strict';

angular.module('ngApp')
  .directive('isLoading', function () {
    return {
      template: '<div class="isloading"></div>',
      replace: true,
      restrict: 'E',
      scope: {
        flag : '='
      },
      link: function(scope, element, attrs) {
        scope.$watch('flag', function(val){
          element.css('display', val ? 'block' : 'none');
        });
      }
    };
  });