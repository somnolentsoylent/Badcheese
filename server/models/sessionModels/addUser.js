var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');
//add a given user to the invited list
module.exports = (sessionId, userId, permission) => {
  return Session.findOneAndUpdate({
    '_id': sessionId
  }, {
    $push: {
      invitedUsers: {
        User: userId,
        Permission: permission
      }
    }
  }).exec()
  .then(event => {
    return User.findOneAndUpdate({
      '_id': userId
    }, {
      $push: {
        sessions: sessionId
      }
    }).exec()
  })
  .then((event) => {
    console.log(event)
  });
};