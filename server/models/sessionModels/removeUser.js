var Session = require('../../schemas/sessionSchema');

module.exports = (sessionId, userId) => {
  return Session.findOneAndUpdate({
    'id': sessionId
  }, {
    $pull: {
      invitedUsers: {
        User: userId
      }
    }
  });
};