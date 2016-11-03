// getUserBoards.js

const Board = require('../../schemas/boardSchema.js');
const User = require('../../schemas/userSchema.js');

module.exports = (userId) => {
  	return User.findOne({_id: userId})
  	.populate('boards')
  	.exec()
}