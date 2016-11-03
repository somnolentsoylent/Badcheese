var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');
//add a given user to the invited list
module.exports = (sessionId, userId, permission) => {
  // console.log(userId)
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
    User.findOneAndUpdate({ 
      '_id': userId
    }, {
      $push: {
        sessions: sessionId
      }
    }).exec()
    // .then(event => {
    //   console.log(event)
    // });
  })
};