ARG FUNCTION_DIR="/function"

FROM node:16 as build-image

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

# Permssions to custom script entrypoint
RUN chmod +x ${FUNCTION_DIR}/entrypoint.sh


WORKDIR ${FUNCTION_DIR}

# intall lambda api caller for prod env
RUN npm install aws-lambda-ric

RUN npm install

# Grab a fresh slim copy of the image to reduce the final size
FROM node:16

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# install mongodb
RUN apt update -y
RUN apt upgrade -y
# RUN apt install curl -y
# RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# RUN chmod +x /usr/local/bin/docker-compose
# COPY ./docker-compose.yml ./
# RUN docker-compose --version
# RUN apt install gnupg2 wget -y
# RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
# RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
# RUN apt update -y
# RUN apt install mongodb-org -y
# SQLITE
RUN apt install sqlite3 
RUN apt install openssl -y

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

# ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]

# FUNCTION_DIR + script
ENTRYPOINT ["/function/entrypoint.sh"]
# file . function
CMD ["server.handler"]