#!/usr/bin/env bash

for folder in services/*; do
    if [[ -f ${folder}/Dockerfile ]]; then
        container=$(basename "${folder}")

        docker tag "${container}" alframi410/"${container}":latest
        docker push alframi410/"${container}":latest
    fi
done
