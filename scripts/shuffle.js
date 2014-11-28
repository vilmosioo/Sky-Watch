'use strict';

// based on http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/
module.exports = function(data){
	var i = data.length, j, temp;
	if ( i == 0 ) return;
	while ( --i ) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}
	return data;
};