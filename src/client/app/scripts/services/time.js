'use strict';

angular.module('ngApp')
  .factory('Time', function () {
    return {
      /**
      * @return the current Julian day, without taking into consideration the current hour
      */
      getJD0 : function(){
        console.log(this);
        var date = new Date();
        return Math.floor((date / 86400000) - (date.getTimezoneOffset()/1440) + 2440587.5) - 0.5;
      },
      /**
      * @return the current Julian day, with hours
      */
      getJD : function(){
        var date = new Date();
        return this.getJD0() + date.getHours()/24 + date.getMinutes()/24/60 + date.getSeconds()/24/3600;
      },
      /**
      * @return number of centuries since the year 2000
      */
      getNC : function(){
        return (this.getND()) / 36525;
      },
      /**
      * @return the number of days and fraction (+ or -) from 2000 January 1, 12h UT, Julian date 2451545.0
      */
      getND : function(){
        return this.getJD() - 2451545.0;
      },
      /**
      * @return the number of days without fraction from 2000 January 1, 12h UT, Julian date 2451545.0
      */
      getND0 : function(){
        return this.getJD0() - 2451545.0;
      },
      /**
      * 
      */
      getGMST : function(){
        var date = new Date();
        var GMST = 6.697374558 + 0.06570982441908 * this.getND0() + 1.00273790935 * date.getHours() + 0.000026 * this.getNC() * this.getNC();
        // normalize between 0-24h
        while(GMST > 24){
          GMST -= 24;
        }
        while(GMST < 0){
          GMST += 24;
        }
        return GMST;
      },
      getGMST0 : function(){
        // http://www.indigotide.com/software/siderealsource.html
        var now = new Date();
        var year = now.getUTCFullYear();   // get UTC from computer clock date & time (var now) 
        var month = now.getUTCMonth() + 1;
        var day = now.getUTCDate();
        var hour = now.getUTCHours();
        var minute = now.getUTCMinutes();
        var second = now.getUTCSeconds();

        if( month == 1 || month == 2 )
        {
        year = year - 1;
        month = month + 12;
        }

        var lc = Math.floor( year/100 );   //integer # days / leap century
        var ly = 2 - lc + Math.floor( lc/4 );   //integer # days / leap year
        var y = Math.floor(365.25 * year);   //integer # days / year
        var m = Math.floor(30.6001 * (month + 1));   //integer # days / month

        // now get julian days since J2000.0 
        var jd = ly + y + m - 730550.5 + day + (hour + minute/60.0 + second/3600.0)/24.0;

        // julian centuries since J2000.0
        var jc = jd/36525.0; 

        // Greenwich Mean Sidereal Time (GMST) in degrees
        var GMST = 280.46061837 + 360.98564736629*jd + 0.000387933*jc*jc - jc*jc*jc/38710000; 

        if( GMST > 0.0 )   // circle goes round and round, adjust if < 0 or > 360 degrees
        {
        while( GMST > 360.0 )
        GMST -= 360.0;
        }
        else
        {
        while( GMST < 0.0 )
        GMST += 360.0;
        }

        return GMST / 15;   // in degrees
      }
    };
  });
