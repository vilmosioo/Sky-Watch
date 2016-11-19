'use strict';

angular.module('ngApp')
  .factory('Sky', function ($http, $q, $rootScope, Constants, Time, LocalStorage, Modernizr) {
    return {
      searchItems : function(params){
        params = params || {};
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : Constants.DEFAULT_LIMIT,
          offset = angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          q = angular.isString(params.q) ? params.q : '';

        return $http({
					url: Constants.SEARCH_URL,
					params: {
						limit: limit,
						offset: offset,
						q: q
					}
				});
      },
      random: function(params){
        params = params || {};
        var limit = angular.isNumber(params.limit) ? parseInt(params.limit, 10) : Constants.DEFAULT_LIMIT;

        return $http({
					url: Constants.RANDOM_URL,
					params: {
						limit: limit
					}
				});
      },
      getItems : function(params){
        params = params || {};
        var _limit = params && angular.isNumber(params.limit) ? Math.min(100, parseInt(params.limit, 10)) : Constants.DEFAULT_LIMIT,
          _offset = params && angular.isNumber(params.offset) ? parseInt(params.offset, 10) : 0,
          _real_offset = _offset % (Constants.BUFFER * _limit),
          _index = Math.floor(_offset / Constants.BUFFER / _limit),
          _defer = $q.defer(),
          _time = Math.round(Time.getJD()),
          _key = Constants.ITEMS + '_' + _time + '_' + _index;

        if(Modernizr.localstorage){
          // delete old keys
          for (var key in LocalStorage){
            if(key.indexOf(_time.toString()) === -1){
              LocalStorage.removeItem(key);
            }
          }

          // watch for changes in LocalStorage
          var items = LocalStorage.getItem(_key);
          if(items){
            items = JSON.parse(items);
            _defer.resolve(items.splice(_real_offset, _limit));
          } else {
            $http({
							url: Constants.NGC_URL,
							params: {
								limit: Constants.BUFFER * _limit,
								offset: _offset
							}
						}).success(function(data){
                // save to storage
                LocalStorage.setItem(_key, JSON.stringify(data.results));
                // handle success
                _defer.resolve(data.results.splice(_real_offset, _limit));
              })
              .error(function(data, status, headers, config){
                _defer.reject(data, status, headers, config);
              });
          }
        } else {
          $http({
						url: Constants.NGC_URL,
						params: {
							limit: _limit,
							offset: _offset
						}
					}).success(function(data){
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
