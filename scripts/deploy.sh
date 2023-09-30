#!/usr/bin/env bash

docker rm $(docker ps -aq) --force
docker run -d -p 3000:3000 code_crafters_node_app
