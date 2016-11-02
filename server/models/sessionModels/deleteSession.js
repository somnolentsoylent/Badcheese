var Session = require('../../schemas/sessionSchema');

module.exports = (sessionId) => {
  return Session.findOneAndRemove( {
    id: sessionId
  });
}