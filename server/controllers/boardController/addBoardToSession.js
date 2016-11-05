// addBoardToSession.js

var boardModels = require('../../models/boardModels');

module.exports = (req, res) => {
  var board = req.body.board;
  var sessionId = req.body.sessionId;
  boardModels.addBoardToSession(board, sessionId)
  .then(success => {
    res.status(201).send('Session Board Added!');
  })   
  .catch(error => {
  	console.log(error);
    res.status(400).send('ERROR: Invalid Session Inputted');
  });
};