var Session = require('../../schemas/sessionSchema');

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
  }).exec();
};