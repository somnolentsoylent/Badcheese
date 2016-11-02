var Session = require('../../schemas/sessionSchema');

module.exports = (sessionId, userId) => {
  return Session.findOneAndUpdate({
    '_id': sessionId
  }, {
    $pull: {
      invitedUsers: {
        User: userId
      }
    }
  }).exec();
};