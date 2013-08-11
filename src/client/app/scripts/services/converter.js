'use strict';

angular.module('ngApp')
  .factory('Converter', function (Time) {
    return {
      /** Converts a set of coordinates from equatorial to local coordinates
      * @param RA - the right ascension, in hours as a float number 
      * @param DE - the declination, in degrees as a float
      */
      convert : function(coord, position){
          var RA = coord.RA,
            DE = coord.DE,
            latitude = position.latitude,
            longitude = position.longitude;

          // GST - Greenwich sideral time - degrees
          var gmst = Time.getGMST();
          
          // LST - local sideral time - degrees
          var lst = gmst + longitude;
      
          // hour angle
          var H = lst - RA * 15;
          
          // convert everything to radians
          H *= Math.PI / 180;
          latitude *= Math.PI / 180;
          longitude *= Math.PI / 180;
          RA *= 15 * Math.PI / 180;
          DE *= Math.PI / 180;
        
          // get altitude
          // sin(Alt) = sin(DE) * sin(lat) + cos(DE) * cos(lat) * cos(H)
          var alt = Math.asin(Math.sin(DE) * Math.sin(latitude) + Math.cos(DE) * Math.cos(latitude) * Math.cos(H));

          // get azimuth
          // sin(Az) = - sin(H) * cos(DE) / cos(Alt)
          // cos(Az) = ( sin(DE) - sin(lat) * sin(Alt) ) / cos(lat) * cos(Alt)
          // tan(Az) = (- sin(H) * cos(DE) / cos(Alt)) / (( sin(DE) - sin(lat) * sin(Alt) ) / cos(lat) * cos(Alt))
          var az = Math.atan2(- Math.sin(H) * Math.cos(DE) / Math.cos(alt), ( Math.sin(DE) - Math.sin(latitude) * Math.sin(alt) ) / (Math.cos(latitude) * Math.cos(alt)));

          while(az < 0){
            az += 2 * Math.PI;
          }
          while(az > 2 * Math.PI){
            az -= 2 * Math.PI;
          }

          return {
            az: az * 180 / Math.PI,
            alt: alt * 180 / Math.PI
          }
      } 
    };
  });
