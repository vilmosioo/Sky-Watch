#!/bin/sh

if [ "${TRAVIS_BRANCH}" = "master" ] && [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
	echo 'Pushing git data to repo...'
	git push origin master || { echo 'Git push failed.' ; exit 1; }
	git push origin master --tags || { echo 'Git tagging failed.' ; exit 1; }

	echo 'Generating Android app'
	cp -R dist/. www/
	cp -R public/. www/
	ionic state restore
	ionic build android
	rm -rf www/

	echo 'Publishing artefacts to Github'
	grunt release
fi
