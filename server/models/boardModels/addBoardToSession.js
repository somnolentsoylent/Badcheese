// addBoardToSession.js

const Board = require('../../schemas/boardSchema.js');
const Session = require('../../schemas/sessionSchema.js');

module.exports = (board, sessionId) => {
  var board = new Board(board);
  return board.save()
  .then( board => {
  	return Session.findOneAndUpdate({_id: sessionId}, {
  		$push: {
  			boards: board._id
  		}
  	}).exec()
  })
}
