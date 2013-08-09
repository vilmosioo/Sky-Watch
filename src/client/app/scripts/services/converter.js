'use strict';

angular.module('ngApp')
  .factory('Converter', function (Time) {
    return {
      /** Converts a set of coordinates from equatorial to local coordinates
      * @param RA - the right ascension, in hours as a float number 
      * @param DE - the declination, in degrees as a float
      */
      convert : function(RA, DE){

          Time.getGMST();
          // LST - local sideral time
          // GST - Greenwich sideral time
          // To an accuracy within 0.1 second per century, Greenwich (Mean) Sidereal Time (in hours and decimal parts of an hour) can be calculated as
          // GMST = 18.697 374 558 + 24.065 709 824 419 08 * D
          // lat - latitude
          // long - longitude
          // Az - azimuth
          // Alt - altitude
          // DE - declination
          // RA - Right ascension
          // H - hour angle

          // get the hour angle
          // H = LST - RA
          // convert hour angle in degrees
          // H = H * 15
          // get Alt
          // sin(Alt) = sin(DE) * sin(lat) + cos(DE) * cos(lat) * cos(H)
          // Alt = Math.asin(sin(DE) * sin(lat) + cos(DE) * cos(lat) * cos(H));

          // get Az
          // sin(Az) = - sin(H) * cos(DE) / cos(Alt)
          // cos(Az) = ( sin(DE) - sin(lat) * sin(Alt) ) / cos(lat) * cos(Alt)
          // tan(Az) = (- sin(H) * cos(DE) / cos(Alt)) / (( sin(DE) - sin(lat) * sin(Alt) ) / cos(lat) * cos(Alt))
          // Az = Math.atan2(- sin(H) * cos(DE) / cos(Alt), ( sin(DE) - sin(lat) * sin(Alt) ) / cos(lat) * cos(Alt));
      } 
    };
  });
