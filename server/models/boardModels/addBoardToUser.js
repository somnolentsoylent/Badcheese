// addBoardToUser.js

const Board = require('../../schemas/boardSchema.js');
const User = require('../../schemas/userSchema.js');

module.exports = (board, userId) => {
  var board = new Board(board);
  return board.save()
  .then( board => {
  	return User.findOneAndUpdate({_id: userId}, {
  		$push: {
  			boards: board._id
  		}
  	}).exec()
  })
}