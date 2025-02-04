#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

IMAGE_NAME=mui-notion-blog

docker build --no-cache --file "$SCRIPT_DIR/Dockerfile" --tag ${IMAGE_NAME} "$SCRIPT_DIR/.."

docker rm --force ${IMAGE_NAME}

docker image prune --force 

docker run --detach --publish 3007:3000 --name ${IMAGE_NAME} ${IMAGE_NAME}