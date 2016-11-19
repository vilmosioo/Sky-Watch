
angular.module('ngApp')
	.factory('Time', function () {
		return {
			/**
			* Get the current julian day
			*/
			getJD : function(){
				return this.getJD2000() + 2451545;
			},
			/**
			* @return the julian days since J2000.0 
			*/
			getJD2000 : function(){
				var now = new Date();
				var year = now.getUTCFullYear();
				var month = now.getUTCMonth() + 1;
				var day = now.getUTCDate();
				var hour = now.getUTCHours();
				var minute = now.getUTCMinutes();
				var second = now.getUTCSeconds();

				if( month === 1 || month === 2 ){
					year = year - 1;
					month = month + 12;
				}

				var lc = Math.floor( year/100 );
				var ly = 2 - lc + Math.floor( lc/4 );
				var y = Math.floor(365.25 * year);
				var m = Math.floor(30.6001 * (month + 1));

				return ly + y + m - 730550.5 + day + (hour + minute/60.0 + second/3600.0)/24.0;
			},
			/**
			* @return number of centuries since J2000
			*/
			getJC : function(){
				return (this.getJD2000()) / 36525.0;
			},
			/**
			* @return get the Greenwich mean sideral time
			*/
			getGMST : function(){
				// http://www.indigotide.com/software/siderealsource.html
				var jc = this.getJC(),
					jd = this.getJD2000(),
					GMST = 280.46061837 + 360.98564736629*jd + 0.000387933*jc*jc - jc*jc*jc/38710000;

				// normalize GMST
				while( GMST > 360.0 ){
					GMST -= 360.0;
				}
				while( GMST < 0.0 ){
					GMST += 360.0;
				}

				return GMST;
			}
		};
	});
