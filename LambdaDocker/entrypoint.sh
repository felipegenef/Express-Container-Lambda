#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
mkdir -p ../mnt/efs/prisma
cp -r ./prisma/schema.prisma ../mnt/efs/prisma/schema.prisma
npx prisma generate --schema ../mnt/efs/prisma/schema.prisma
npx prisma migrate dev --name migration --schema ../mnt/efs/prisma/schema.prisma
NODE_ENV=local node server.js
else
# AWS
mkdir -p ../mnt/efs/data
mkdir -p ../mnt/efs/logs
mkdir -p ../mnt/efs/prisma
cp -r ./prisma/schema.prisma ../mnt/efs/prisma/schema.prisma
/usr/local/bin/npx prisma generate --schema ../mnt/efs/prisma/schema.prisma
/usr/local/bin/npx prisma migrate dev --name migration --schema ../mnt/efs/prisma/schema.prisma
/usr/local/bin/npx aws-lambda-ric $1
fi  


