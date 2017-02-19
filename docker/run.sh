#!/bin/bash

sudo docker run \
    -it \
    --rm \
    --name markov-web-app \
    -p 8001:8001 \
    markov-web-app
