# # FROM mongo

# FROM amazon/aws-lambda-nodejs:16

	
# ARG FUNCTION_DIR="/"

# # RUN apt update -y
# # RUN apt upgrade -y
# # RUN apt install gnupg2 wget -y
# # RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
# # RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
# # RUN apt update -y
# # RUN apt install mongodb-org -y



# COPY package*.json ./

# RUN npm install

# COPY . .



# COPY ./entrypoint.sh /entrypoint.sh

# RUN chmod +x entrypoint.sh

# # ENTRYPOINT ["/entrypoint.sh"]
# # ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]

# # ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]


# # CMD ["server.handler"]

# Define custom function directory
ARG FUNCTION_DIR="/function"

FROM node:14 as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY . ${FUNCTION_DIR}
RUN chmod +x ${FUNCTION_DIR}/entrypoint.sh

WORKDIR ${FUNCTION_DIR}


RUN npm install aws-lambda-ric

RUN npm install

# Grab a fresh slim copy of the image to reduce the final size
FROM node:14

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

# ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]


ENTRYPOINT ["/function/entrypoint.sh"]
CMD ["server.handler"]