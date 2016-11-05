// getSession.js

const Session = require('../../schemas/sessionSchema.js');

module.exports = (sessionId) => {
  	return Session.findOne({_id: sessionId}).exec()
}