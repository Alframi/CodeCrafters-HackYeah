#!/usr/bin/env bash

docker stack rm code_crafters
sleep 10
docker stack deploy -c docker-stack.yml code_crafters --prune --with-registry-auth
