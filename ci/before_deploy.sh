#!/bin/sh

# prepare artefacts for deployment

git checkout openshift/skywatch
git rm -r public
git add public
git commit -m "Artefacts generated"
git push origin openshift/skywatch

git checkout openshift/nginx
git rm -r dist
git add dist
git commit -m "Artefacts generated"
git push origin openshift/nginx

git checkout master