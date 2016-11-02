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
// mongoose.connect('mongodb://localhost/drawmie');
// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
// mongoose.connection.on('connected', function callback () {
//   console.log('Mongoose connection open on mongodb://localhost/drawmie!');
// });

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
    const liveBoard = util.doGetBoard(id);
    if (liveBoard) {
      socket.join(id);
      io.to(id).emit('renderme', liveBoard.board);
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
