'use strict';

angular.module('ngApp')
  .factory('Sky', function ($http, Constants) {

    return {
      searchItems : function(params){
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          q = angular.isString(params.q) ? params.q : '';

        return $http.jsonp(Constants.searchUrl + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset + '&q=' + q);
      },
      getItems : function(params){
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0;

        return $http.jsonp(Constants.ngcUrl + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset);
      }
    };
  });
