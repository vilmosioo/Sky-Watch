'use strict';

/* globals Modernizr */

angular.module('ngApp')
  .factory('Sky', function ($http, $rootScope, Constants, Time) {
    return {
      searchItems : function(params){
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          q = angular.isString(params.q) ? params.q : '';

        return $http.jsonp(Constants.SEARCH_URL + '?callback=JSON_CALLBACK&limit=' + limit + '&offset=' + offset + '&q=' + q);
      },
      getItems : function(params){
        var _limit = params && angular.isNumber(params.limit) ? parseInt(params.limit, 10) : 10,
          _offset = params && angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          _index = (Math.round((_offset + _limit) / 100) + 1) * 100;

        // variables
        var _onSuccess, _onError, _promise = {
          then: function(onSuccess, onError){
            _onSuccess = onSuccess;
            _onError = onError;
            return _promise;
          },
          success: function(onSuccess){
            _onSuccess = onSuccess;
            return _promise;
          },
          error: function(onError){
            _onError = onError;
            return _promise;
          }
        }, _time = Math.round(Time.getJD()), _key = Constants.ITEMS + '_' + _time + '_' + _index;

        if(Modernizr.localstorage){
          // delete old keys
          for (var key in localStorage){
            if(key.indexOf(_time) === -1){
              localStorage.removeItem(key);
            }
          }

          // watch for changes in localstorage
          var binding = $rootScope.$watch(function(){
            return localStorage.getItem(_key);
          }, function(value){
            if(value){
              if(typeof _onSuccess === 'function'){
                var items = JSON.parse(value);
                _onSuccess(items.splice(_offset, _limit));
              }
              // cancel binding
              binding();
            } else {
              $http.jsonp(Constants.NGC_URL + '?callback=JSON_CALLBACK&limit=' + _index + '&offset=' + (_index - 100))
              .success(function(data){
                // save to storage 
                localStorage.setItem(_key, JSON.stringify(data.results));
              })
              .error(function(data, status, headers, config){
                if(typeof _onError === 'function'){
                  _onError(data, status, headers, config);
                }
                // cancel binding
                binding();
              });
            }
          });
        } else {
          $http.jsonp(Constants.NGC_URL + '?callback=JSON_CALLBACK&limit=' + _limit + '&offset=' + _offset)
            .success(function(data){
              if(typeof _onSuccess === 'function'){
                _onSuccess(data.results);
              }
            })
            .error(function(data, status, headers, config){
              if(typeof _onError === 'function'){
                _onError(data, status, headers, config);
              }
            });
        }

        return _promise;
      }
    };
  });
