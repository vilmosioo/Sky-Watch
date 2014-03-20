#!/bin/sh

echo 'Switching to master and setting identity for git'
git checkout master
git config user.name $GIT_NAME
git config user.email $GIT_EMAIL
git config credential.helper "store --file=.git/credentials"
git config remote.origin.url https://github.com/vilmosioo/Sky-Watch.git
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

echo 'Patching version...'
npm version patch -m "Updating version [skip ci]" || { echo 'Version patch failed' ; exit 1; }

echo 'Running build command (default), assuming we are in the client folder'
cd src/client || { echo 'Could not find src folder' ; exit 1; }
grunt || { echo 'Build failed' ; exit 1; }

exit 0;