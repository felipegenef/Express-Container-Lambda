#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
mkdir -p ../mnt/efs/prisma
cp -r ./prisma/schema.prisma ../mnt/efs/prisma/schema.prisma
npx prisma generate --schema ../mnt/efs/prisma/schema.prisma
npx prisma migrate dev --name teste  --schema ../mnt/efs/prisma/schema.prisma
NODE_ENV=local node server.js
else
# AWS
  mkdir -p ../mnt/efs/data
  mkdir -p ../mnt/efs/logs
  # /usr/local/bin/npx sequelize-cli db:migrate
  /usr/local/bin/npx aws-lambda-ric $1
fi  


