#!/bin/bash

sudo docker run \
    -it \
    --rm \
    -p 8001:8001 \
    markov_web_app
