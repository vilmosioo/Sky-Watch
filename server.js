'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	models = require('./models'),
	path = require('path'),
	pck = require('./package.json'),
	routes = require('./routes');

var app = express(),
	router = express.Router();

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
	app.use(require('connect-livereload')());
	app.use(express.static(path.join(__dirname, pck.config.app)));
	app.use(express.static(path.join(__dirname, pck.config.tmp)));
} else if(process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname, pck.config.public)));
	app.use(express.static(path.join(__dirname, pck.config.dist)));
} else {
	app.use(express.static(path.join(__dirname, pck.config.public)));
}

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
	// https://help.openshift.com/hc/en-us/articles/202185874
	// ports 15000 - 35530 are available on openshift
	var server = app.listen(15000, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function(){
		console.log('Server listening on ' + server.address().address + ':' + server.address().port);
	});
}, function(err){
	console.log('An error occurred when bootstrapping the application.');
	console.log(err);
});