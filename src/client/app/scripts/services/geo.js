'use strict';

angular.module('ngApp')
    .factory('Geo', function ($q, $rootScope) {
        return {
            locate: function () {
                var defer = $q.defer(); 
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        defer.resolve(position);
                        $rootScope.$apply();
                    },
                    function(error) {
                        defer.reject(error);
                        $rootScope.$apply();
                    });
                return defer.promise;
            }
        };     
    });