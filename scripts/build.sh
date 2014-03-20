#!/bin/sh

# run build command (default), assuming we are in the client folder
cd src/client || { echo 'Could not find src folder' ; exit 1; }
grunt || { echo 'Build failed' ; exit 1; }

exit 0;