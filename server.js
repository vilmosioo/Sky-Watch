'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	models = require('./models'),
	routes = require('./routes');

var app = express(),
	router = express.Router();

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use(require('./scripts/headers'));
router.use(require('./scripts/options'));
router.get('/', routes.root);
router.get('/ngc', routes.ngc);
router.get('/planet', routes.planet);
router.get('/browse', routes.browse);
router.get('/search', routes.search);
router.use(require('./scripts/404'));

app.use('/api', router);

console.log('Bootstrapping application, this may take a moment...');
models.bootstrap().then(function(){
	var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function(){
		console.log('Server listening on ' + server.address().address + ':' + server.address().port);
	});
}, function(err){
	console.log('An error occurred when bootstrapping the application.');
	console.log(err);
});