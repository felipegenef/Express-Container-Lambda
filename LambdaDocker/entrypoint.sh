#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
mkdir -p ../mnt/efs/data
/usr/local/bin/npx sequelize-cli db:migrate
node local.js
else
# AWS
  mkdir -p ../mnt/efs/data
  /usr/local/bin/npx sequelize-cli db:migrate
  /usr/local/bin/npx aws-lambda-ric $1
fi  


