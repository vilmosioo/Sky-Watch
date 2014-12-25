Sky Watch
=============

Predictive app to determine what interesting astronomical objects are viewable from the user's location at local time. See a [demo](http://skywatch.vilmosioo.co.uk)

![Build Status](https://travis-ci.org/vilmosioo/Sky-Watch.svg?branch=master)](https://travis-ci.org/vilmosioo/Sky-Watch)

## Server

[Express](http://expressjs.com/) REST-ful server.

## Client

[Angular](http://angularjs.org/) client that displays data returned from the server.

### Development

	git clone https://github.com/vilmosioo/Sky-Watch.git
	bower install & npm install
	grunt

To run app in a development environment

	grunt serve

To run app in a production environment

	grunt build

## Architecture

The application is built using [Travis](https://travis-ci.org/vilmosioo/Sky-Watch) and automatically deployed to [Openshift](https://www.openshift.com/)

TODO Describe the workflow in more detail
