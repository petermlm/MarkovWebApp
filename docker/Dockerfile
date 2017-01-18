FROM ubuntu:16.04

# Install Python Node and npm, which is what is going to be running the
# applications. Also, install git
RUN apt update
RUN apt -qq -y install python3 python3-pip nodejs npm git
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Create directories for Markov and MarkovWebApp projects
RUN mkdir /tmp/Markov /tmp/MarkovWebApp

# Pull versions from GitHub
RUN cd /tmp/Markov && \
    git clone https://github.com/petermlm/Markov . && \
    git checkout c55d50a2c7c757100e9e8c93f048c9831bb1ebf0

RUN cd /tmp/MarkovWebApp && \
    git clone https://github.com/petermlm/MarkovWebApp . && \
    git checkout 5b1f5991c3d5b0931004bd65a1b0661f8fd4877d

# Install PIP and NPM packages
RUN pip3 install numpy
RUN cd /tmp/MarkovWebApp && npm install
RUN cd /tmp/MarkovWebApp && npm install -g webpack

# Build MarkovWebApp
RUN cd /tmp/MarkovWebApp && npm run build
