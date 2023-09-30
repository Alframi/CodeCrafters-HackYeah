#!/usr/bin/env bash

docker stack deploy -c docker-stack.yml code_crafters --prune --with-registry-auth
