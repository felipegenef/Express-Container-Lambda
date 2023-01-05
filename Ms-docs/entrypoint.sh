#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
NODE_ENV=local node src/server.js
else
# AWS
/usr/local/bin/npx aws-lambda-ric $1
fi  


