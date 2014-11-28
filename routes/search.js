'use strict';

module.exports = function(req, res){
	var q = req.param('q');
	if(!q){
		res.send(400, {
			message: 'Please provide a search query in the form of /search?q=[your query]'
		})
	}
	res.send({
		title: 'Search',
		results: []
	});
};