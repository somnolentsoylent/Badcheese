var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');

module.exports = (sessionId) => {
  return Session.findOneAndRemove( {
    _id: sessionId
  }).exec()
  .then(event => {
    return Promise.all(
      event.invitedUsers.map( user => {
        return removeSession(event._id, user.User)
      })  
    )
  })
}

var removeSession = function(sessionId, userId){
  return User.findOneAndUpdate({
    '_id': userId
  }, {
    $pull: {
      'sessions': sessionId
    }
  }).exec()
  .then(event => {
    // console.log(event)
  });
}