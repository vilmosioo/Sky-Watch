'use strict'

angular.module('ngApp')
  .factory('Sky', function () {
    var sky = {};
    sky.getItems = function(){
      return [ 
        {
          title : 'Messier 1',
          names : ['Crab Nebula', 'NGC 1952'],
          description : 'Supernova remnant in Constellation  Taurus',
          coordinates : {
            RA : {
              h : 5,
              m : 34,
              s : 31.94
            },
            DE : {
              d : 22,
              m : 0,
              s : 52.2
            }
          },
          distance : 6.5,
          e_distance : 1.6,
          Vmag: 8.4,
          dimensions: [420, 290]
        } 
      ];
    };
    return sky;
  });
