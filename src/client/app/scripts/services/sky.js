'use strict';

angular.module('ngApp')
  .factory('Sky', function ($http) {
    return {
      searchItems : function(params){
        var items = [],
          searchUrl = 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1/search',
          limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          q = angular.isString(params.q) ? params.q : '';

        $http.jsonp(searchUrl + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset + '&q=' + q)
        .success(function(data){
          for(var i = 0; angular.isArray(data.results) && i < data.results.length; i++){
            items.push(data.results[i]);
          }
        })
        .error(function(data, status, headers, config){
          console.log('error', data, status, headers, config);
        });

        return items;
      },
      getItems : function(params){
        var items = [],
          ngcUrl = 'http://vilmosioo.co.uk/sky-watch-server/public/index.php/v1',
          limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0;

        $http.jsonp(ngcUrl + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset)
        .success(function(data){
          for(var i = 0; angular.isArray(data.results) && i < data.results.length; i++){
            items.push(data.results[i]);
          }
        })
        .error(function(data, status, headers, config){
          console.log('error', data, status, headers, config);
        });

        return items;
      }
    };
  });
