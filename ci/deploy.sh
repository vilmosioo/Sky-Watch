#!/bin/sh

set -e

# prepare artefacts for deployment
echo 'Preparing to deploy...'

git remote add nginx ssh://548f150d5973ca6d0b00014f@nginx-vilmosioo.rhcloud.com/~/git/nginx.git/
git remote add skywatch ssh://548f150d5973ca6d0b00014f@nginx-vilmosioo.rhcloud.com/~/git/nginx.git/
git remote -v
git remote update
git fetch

echo "Deploying skywatch app"
git checkout master
git checkout --track -b openshift/skywatch skywatch/master
git rm -r public
git add public
git commit -m "Artefacts generated"
git push origin openshift/skywatch
git push skywatch HEAD:master

echo "Deploying nginx app"
git checkout master
git checkout --track -b openshift/nginx nginx/master
git rm -r dist
git add dist
git commit -m "Artefacts generated"
git push origin openshift/nginx
git push nginx HEAD:master

# finished
git checkout $TRAVIS_BRANCH