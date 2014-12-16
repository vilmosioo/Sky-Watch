#!/bin/sh

# prepare artefacts for deployment
# TODO update github

git checkout openshift/skywatch
git rm -r public
git add public
git commit -m "Artefacts generated"

git checkout openshift/nginx
git rm -r dist
git add dist
git commit -m "Artefacts generated"

git checkout master