// getUserSessions.js

const Session = require('../../schemas/sessionSchema.js');
const User = require('../../schemas/userSchema.js');

module.exports = (userId) => {
  	return User.findOne({_id: userId})
  	.populate('sessions')
  	.exec()
}