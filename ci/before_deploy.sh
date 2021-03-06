#!/bin/sh

# prepare artefact for deployment, should remove ionic dependencies

git rm -rf client
git rm -rf test
git rm .bowerrc
git rm .jshintrc
git rm bower.json
git rm .gitignore
git rm protractor.conf.js
git rm karma.conf.js
git rm Gruntfile.js

# files ignored by git are not removed

rm -rf client
rm -rf .sass-cache
rm -rf .tmp
rm -rf coverage
rm -rf node_modules

git add dist
git add public
git commit -m "Artefacts generated"