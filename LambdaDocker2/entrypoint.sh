#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
# /usr/local/bin/npx sequelize-cli db:migrate
node local.js
else
# AWS
  mkdir -p ../mnt/efs/data
  mkdir -p ../mnt/efs/logs
  # /usr/local/bin/npx sequelize-cli db:migrate
  /usr/local/bin/npx aws-lambda-ric $1
fi  


