const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const LiveBoard = require('./helpers/liveBoard.js');
const util = require('./helpers/utils');

const port = 3000;
// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

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
