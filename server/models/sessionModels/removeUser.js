var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');

module.exports = (sessionId, userId) => {
  return Session.findOneAndUpdate({
    '_id': sessionId
  }, {
    $pull: {
      invitedUsers: {
        User: userId
      }
    }
  }).exec()
  .then(event => {
    return User.findOneAndUpdate({
      '_id': userId
      }, {
        $pull: {
          'sessions': sessionId
        }
      }).exec()
  });
}
