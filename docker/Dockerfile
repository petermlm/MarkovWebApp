FROM ubuntu:16.04

# Install Python, Node and npm, which is what is going to be running the
# applications. Also, install git
RUN apt update --fix-missing
RUN apt -qq -y install python3 python3-pip nodejs npm git
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Install numpy
RUN pip3 install numpy

# Create directories for Markov and MarkovWebApp projects
RUN mkdir -p /app/Markov /app/MarkovWebApp

# Pull versions from GitHub
RUN cd /app/Markov && \
    git clone https://github.com/petermlm/Markov .

ADD . /app/MarkovWebApp

# Install NPM packages
RUN cd /app/MarkovWebApp && npm install
RUN cd /app/MarkovWebApp && npm install -g webpack

# Build MarkovWebApp
RUN cd /app/MarkovWebApp && npm run build

WORKDIR /app/MarkovWebApp
CMD [ "npm", "start" ]
