'use strict';

angular.module('ngApp')
  .factory('Sky', function ($http, $q, $rootScope, Constants, Time, LocalStorage, Modernizr) {
    return {
      searchItems : function(params){
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          q = angular.isString(params.q) ? params.q : '';

        return $http.jsonp(Constants.SEARCH_URL + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset + '&q=' + q);
      },
      getItems : function(params){
        var _limit = params && angular.isNumber(params.limit) ? Math.min(100, parseInt(params.limit, 10)) : 10,
          _offset = params && angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          _index = (Math.round((_offset + _limit) / 100) + 1) * 100,
          _defer = $q.defer(),
          _time = Math.round(Time.getJD()),
          _key = Constants.ITEMS + '_' + _time + '_' + _index;

        if(Modernizr.localstorage){
          // delete old keys
          for (var key in LocalStorage){
            if(key.indexOf(_time) === -1){
              LocalStorage.removeItem(key);
            }
          }

          // watch for changes in LocalStorage
          var items = LocalStorage.getItem(_key);
          if(items){
            items = JSON.parse(items);
            _defer.resolve(items.splice(_offset, _limit));
          } else {
            $http.jsonp(Constants.NGC_URL + '?callback=JSON_CALLBACK&limit=' + _index + '&offset=' + (_index - 100))
              .success(function(data){
                // save to storage 
                LocalStorage.setItem(_key, JSON.stringify(data.results));
                // handle success
                _defer.resolve(data.results);
              })
              .error(function(data, status, headers, config){
                _defer.reject(data, status, headers, config);
              });
          }
        } else {
          $http.jsonp(Constants.NGC_URL + '?callback=JSON_CALLBACK&limit=' + _limit + '&offset=' + _offset)
            .success(function(data){
              _defer.resolve(data.results);
            })
            .error(function(data, status, headers, config){
              _defer.reject(data, status, headers, config);
            });
        }

        return _defer.promise;
      }
    };
  });
