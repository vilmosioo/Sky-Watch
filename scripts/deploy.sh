#!/bin/sh

echo 'Pushing git data to repo...'
git push origin master || { echo 'Git push failed.' ; exit 1; }
git push origin master --tags || { echo 'Git tagging failed.' ; exit 1; }

echo 'deploy to FTP server, assuming we are in the client folder'
cd src/client || { echo 'Could not find src folder' ; exit 1; }
grunt replace || { echo 'Replace failed.' ; exit 1; }
grunt ftp-deploy || { echo 'Deployment failed.' ; exit 1; }

exit 0;