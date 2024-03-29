#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
npm run migrate
NODE_ENV=local node src/server.js
else
# AWS
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
npm run migrate
/usr/local/bin/npx aws-lambda-ric $1
fi  


