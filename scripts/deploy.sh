#!/bin/sh

# deploy to FTP server, assuming we are in the client folder
cd src/client || { echo 'Could not find src folder' ; exit 1; }
grunt replace || { echo 'Replace failed.' ; exit 1; }
grunt ftp-deploy || { echo 'Deployment failed.' ; exit 1; }

exit 0;