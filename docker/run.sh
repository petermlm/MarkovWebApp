#!/bin/bash

sudo docker run --rm -it -p 3000:3000 \
    markov_web_app \
    /bin/bash -c "cd /tmp/MarkovWebApp && npm start"
