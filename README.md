*This is an old project I no longer activly maintain. I've reimplemented this
in Python in
[petermlm/markovweb](https://github.com/petermlm/markovweb).*

This is a simple Web Application that I've done to learn more about Node.js,
React, and it's related technologies, like webpack, babel, etc.

The application is just a web interface for my implementation of a [Markov Text
Generator](https://github.com/petermlm/Markov).

# How to Run With Docker

Just do the following:

    cd /path/to/project/
    cd docker
    ./build.sh
    ./run.sh

So, `cd` into the docker directory in the project's directory and run
`build.sh` and `run.sh`. The build script will create a docker image from a
Ubuntu 16.04 image containing Python, Node.js, and a few other needed packages.
The run script will execute the built image in a container and expose port 3000
with the application. Everything should work like that.

# How to Run Without Docker

Your environment will the need the following packages:

    python3
    python3-pip
    nodejs
    npm

Then install Numpy for the Markov Python3 project:

    pip3 install numpy

And install the necessary npm packages (Run in projects directory because of
`package.json`). Note that webpack is installed globally:

    npm install
    npm install -g webpack

Finally. The projects should be in a directory side-by-side. By executing the
following command, the application should work and be accessible from
[Localhost](http:\\\\localhost:3000\\).

# What this uses

This project uses my [Markov Text
Generator](https://github.com/petermlm/Markov) project, which is a quick and
dirty implementation of a Markov Text generator using Markov Chains.

It then uses Node.js + express to build a backend, and React for FrontEnd.
