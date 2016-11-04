'use strict';
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const LiveBoard = require('./helpers/liveBoard.js');
const util = require('./helpers/utils');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
const passport = require('passport');


const port = 3000;

//connect the database
if (!process.argv[2]) {
  mongoose.connect('mongodb://localhost/drawmie');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.on('connected', function callback () {
    console.log('Mongoose connection open on mongodb://localhost/drawmie!');
  });
}

let peers = {};
let chatRooms = {};


//configure passport
require('./authentication/init.js')(passport);

require('./middleware.js')(app, express);

// configure our server with all the middleware and routing
require('./routes.js')(app, express);

// Server Port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

io.on('connection', (socket) => {
  socket.on('addMeToRoom', (id) => {
    chatRooms[id] = chatRooms[id] || []
    socket.emit('fetchMessages', chatRooms[id])
    const liveBoard = util.doGetBoard(id);
    if (liveBoard) {
      socket.join(id);
      io.to(id).emit('renderme', liveBoard.board);
      socket.on('peerId', peerId => {
        peers[id] = peers[id] || [];
        peers[id].push(peerId);
        socket.emit('peers', peers[id]);
      })
      socket.on('newStreamer', peerId => {
        let i = peers[id].indexOf(peerId);
        if (i != -1) {
          peers[id].splice(i, 1);
          peers[id].unshift(peerId);
        }
        io.to(id).emit(peers[id]);
      });
      socket.on('sendMessage', message => {
        chatRooms[id].unshift(message);
        io.to(id).emit('fetchMessages', chatRooms[id])
      });
      socket.on('clientDrawing', (data) => {
        liveBoard.loadChange(data, function(changes) {
          io.to(id).emit('renderme', changes);
        });
      });
    }
  });
});

//export the app
module.exports = app;
