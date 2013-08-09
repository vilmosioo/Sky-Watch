'use strict';

angular.module('ngApp')
  .factory('Time', function () {
    return {
      /**
      * @return the julian days since J2000.0 
      */
      getJD : function(){
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

        return ly + y + m - 730550.5 + day + (hour + minute/60.0 + second/3600.0)/24.0;        
      },
      /**
      * @return number of centuries since J2000
      */
      getJC : function(){
        return (this.getJD()) / 36525.0;
      },
      /**
      * @return get the Greenwich mean sideral time
      */
      getGMST : function(){
        // http://www.indigotide.com/software/siderealsource.html
        var jc = this.getJC(), 
          jd = this.getJD(); 
        
        console.group('GSMT0');
        console.log('jd', this.getJD());
        console.log('jc', this.getJC());
        
        // Greenwich Mean Sidereal Time (GMST) in degrees
        var GMST = 280.46061837 + 360.98564736629*jd + 0.000387933*jc*jc - jc*jc*jc/38710000; 
        
        // normalize GMST
        while( GMST > 360.0 ){
          GMST -= 360.0;
        }
        while( GMST < 0.0 ){
          GMST += 360.0;
        }

        console.log('GMST', GMST / 15)
        console.groupEnd();

        // turn to hours
        return GMST / 15;   
      }
    };
  });
