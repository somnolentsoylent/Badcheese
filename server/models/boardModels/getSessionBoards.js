// getSessionBoards.js


const Board = require('../../schemas/boardSchema.js');
const Session = require('../../schemas/sessionSchema.js');

module.exports = (sessionId) => {
  	return Session.findOne({_id: sessionId})
  	.populate('boards')
  	.exec()
}