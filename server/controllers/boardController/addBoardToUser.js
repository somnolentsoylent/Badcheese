// addBoardToUser.js

var boardModels = require('../../models/boardModels');

module.exports = (req, res) => {
  var board = req.body.board;
  var userId = req.body.userId;
  boardModels.addBoardToUser(board, userId)
  .then(success => {
    res.status(201).send('User Board Added!');
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Session Inputted');
  });
};