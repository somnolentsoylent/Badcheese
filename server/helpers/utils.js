const mongoose = require('mongoose');
const LiveBoard = require('./liveBoard');

// Replace mongoose's outdated Promise library
mongoose.Promise = Promise;

// Board Related
const boards = {};

module.exports = {

  doGetNewBoard: (id) => {
    const board = LiveBoard();
    boards[id] = board;
  },

  doGetBoard: (id) => { return boards[id]; },

  // doArchiveBoard: () => { TODO: archives a finished board },

};
