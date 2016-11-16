# Drawmie

A fun collaborative drawing tool

## Team
*Previous:*
  - __Product Owner__: Alberto Madueno
  - __Scrum Master__: Daniel Shneyder
  - __Development Team Members__: Nick Lathen, Tim Morgan

*Cuurent:*
  - __Product Owner__: Omar Mohamed
  - __Scrum Master__: Spencer Lopez
  - __Development Team Members__: Carlos Flores

## Table of Contents

1. [Team](#team)
1. [Usage](#usage)
1. [Development](#development)
  1. [Dependencies](#dependencies)
1. [Contributing](#contributing)

## Usage
From within the root directory

```sh
$ npm install
$ webpack
$ nodemon server/server.js
```

After starting the server (see above) load [http://localhost:3000](http://localhost:3000) in your favorite
browser (preferably Google Chrome). Then, create an account to log in and have access to your dashboard. From
your dashboard you can create new rooms and invite collaborators and set their permissions. Once you join a room,
you can draw, video chat and send messages in real-time. If you really like the drawings you're working on, you
can save your drawings specifically to that room or to your account to access in other roooms.

## Development
#### Technologies Used:
- __Node.js__: Used for the backend
- __Socket.io__: Used for client to client communication.
- __React__: Used for the frontend
- __PeerJS__: Used for video chat

#### Dependencies

- [Node.js](https://nodejs.org/en/)
- [Webpack](https://www.npmjs.com/package/webpack)
- [Nodemon](https://www.npmjs.com/package/nodemon)




## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
