FROM ubuntu:16.04

# Install Python, Node and npm, which is what is going to be running the
# applications. Also, install git
RUN apt update
RUN apt -qq -y install python3 python3-pip nodejs npm git
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Install numpy
RUN pip3 install numpy

# Create directories for Markov and MarkovWebApp projects
RUN mkdir /tmp/Markov /tmp/MarkovWebApp

# Pull versions from GitHub
RUN cd /tmp/Markov && \
    git clone https://github.com/petermlm/Markov . && \
    git checkout 9818d63a3cadacfe84e2dec31629e4eeae1da6f4

RUN cd /tmp/MarkovWebApp && \
    git clone https://github.com/petermlm/MarkovWebApp . && \
    git checkout 957a069de4286ea5485f77be69c60852ba095b39

# Install NPM packages
RUN cd /tmp/MarkovWebApp && npm install
RUN cd /tmp/MarkovWebApp && npm install -g webpack

# Build MarkovWebApp
RUN cd /tmp/MarkovWebApp && npm run build
