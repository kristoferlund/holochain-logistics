# Holochain Events Goer 4000

A simple event app designed to get new users up, running and developing on Holochain

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

There is only one prerequisite, if you are on Mac or Ubuntu:
On MacOS:
```
brew install zmq
```
On Ubuntu:
```
apt-get install libzmq3-dev
```

### Running

#### mac
`$ ./run-mac.sh`

#### ubuntu
`$ ./run-ubuntu.sh`

#### windows
Download and Install [Git Bash](https://git-scm.com/downloads) if you don't already have it.
It provides a Bash terminal, helpful for launching the necessary scripts.
Open Git Bash
Change directories in the terminal to the `day1` folder.
- **msvc**
    - `$ sh ./run-windows-msvc.sh`
- **gnu**
    - `$ sh ./run-windows-gnu.sh`


Then, open [http://localhost:3000](http://localhost:3000) in your browser. You're running Holochain!


### Networking

If you want to try and connect to other nodes this also requires the holochain networking library [n3h](https://github.com/holochain/n3h).

Instructions for networking can be found in the [conductor config](conductor-config.toml) file.

## Building from Source

### Holochain DNA

Building the DNA also requires that the holochain developer CLI, `hc`, is installed. Once you have `hc` installed, you can run the helper script

```
npm run hc:build
```

or use the CLI directly

```
mkdir -p dna
cd dna-src
hc package --strip-meta -o ../dna/events-goer-4000.hcpkg
```

### UI

```
cd ui-src
npm install
npm run build
```

## Built With

* [Holochain](https://developer.holochain.org/)
* [React](https://reactjs.org/)

A huge acknowledgement to Pusher for providing an open source React event UI (https://github.com/pusher/react-slack-clone)

## Authors

* **Willem Olding** - *Initial work* - [willemolding](https://github.com/willemolding)
* **Connor Turland** - [Connoropolous](https://github.com/Connoropolous)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

