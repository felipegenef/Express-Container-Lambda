ARG FUNCTION_DIR="/function"

FROM node:16-slim as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    autoconf \
    libtool \
    python3 \
    libcurl4-openssl-dev
# SQLITE
RUN apt install sqlite3 
# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY . ${FUNCTION_DIR}


# Permssions to custom script entrypoint
RUN chmod +x ${FUNCTION_DIR}/entrypoint.sh


WORKDIR ${FUNCTION_DIR}

# intall lambda api caller for prod env
RUN npm install aws-lambda-ric

RUN npm install --production
RUN npx tsc --project tsconfig.json

# Grab a fresh slim copy of the image to reduce the final size
FROM node:16-slim

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}


EXPOSE 8080
# FUNCTION_DIR + script
# ENTRYPOINT ["/function/entrypoint.sh"]
# file . function
# CMD ["src/server.handler"]