#!/bin/sh

echo 'Switching to master and setting identity for git'
git checkout master
git config user.name $GITHUB_USER
git config user.email $GITHUB_EMAIL
git config credential.helper "store --file=.git/credentials"
git config remote.origin.url https://github.com/vilmosioo/Sky-Watch.git
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

echo 'Patching version...'
npm version patch -m "Updating version [skip ci]" || { echo 'Version patch failed' ; exit 1; }

echo 'Running build command (default), assuming we are in the client folder'
grunt || { echo 'Client build failed' ; exit 1; }

echo 'Pushing git data to repo...'
git push origin master || { echo 'Git push failed.' ; exit 1; }
git push origin master --tags || { echo 'Git tagging failed.' ; exit 1; }

exit 0;