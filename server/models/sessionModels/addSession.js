var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');
//add session to the database
module.exports = (session) => {
  var newSession = new Session(session);
  return newSession.save()
  .then( event => {
    return Promise.all(
      event.invitedUsers.map( user => {
        return addSession(event._id, user.User)
        // .then((result)=>{console.log(result)})
      })  
    )
  })
}


var addSession = function(sessionId, userId){
  return User.findOneAndUpdate({
    '_id': userId
  }, {
    $push: {
      'sessions': sessionId
    }
  }).exec();
}