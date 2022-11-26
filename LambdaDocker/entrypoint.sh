#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
  mongod --dbpath /mnt/efs &
  # docker-compose up &
  /usr/local/bin/aws-lambda-rie /usr/bin/npx aws-lambda-ric $1
else
# Prod
  mongod --dbpath /mnt/efs &
  # docker-compose up &
  /usr/local/bin/npx aws-lambda-ric $1
fi  


