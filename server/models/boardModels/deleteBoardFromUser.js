// deleteBoardFromUser.js

const Board = require('../../schemas/boardSchema.js');
const User = require('../../schemas/userSchema.js');

module.exports = (boardId, userId) => {
  	return User.findOneAndUpdate({_id: userId}, {
  		$pull: {
  			boards: boardId
  		}
  	}).exec()
}