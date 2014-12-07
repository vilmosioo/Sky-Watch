#!/bin/sh

# prepare artefact for deployment

git rm -rf node_modules
git rm -rf client
git rm -rf test
git rm .bowerrc
git rm .jshintrc
git rm bower.json
git rm protractor.conf.js
git rm karma.conf.js
git rm Gruntfile.js
git rm .gitignore

git add dist
git commit -m "Artefacts generated"