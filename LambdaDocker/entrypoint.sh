#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
# local

  mkdir -p ../mnt/efs/data
  touch ../mnt/efs/data/schema.prisma
  cp -f ./prisma/schema.prisma ../mnt/efs/data/schema.prisma
  # /usr/local/bin/npx prisma migrate dev --name migration --schema="../mnt/efs/data/schema.prisma"
  /usr/local/bin/aws-lambda-rie /usr/bin/npx aws-lambda-ric $1
else
  mkdir -p ../mnt/efs/data
  touch ../mnt/efs/data/schema.prisma
  cp -f ./prisma/schema.prisma ../mnt/efs/data/schema.prisma
  # /usr/local/bin/npx prisma migrate dev --name migration --schema="../mnt/efs/data/schema.prisma"
  /usr/local/bin/npx aws-lambda-ric $1
fi  


