var Session = require('../../schemas/sessionSchema');
var User = require('../../schemas/userSchema');
//add session to the database
module.exports = (session) => {
  console.log('in session')
  var newSession = new Session(session);
  newSession.invitedUsers.push(session.host);
  return newSession.save()
  .then( event => {
    return Promise.all(
      event.invitedUsers.map( user => {
        return addSession(event._id, user.email)
        .then((result)=>{console.log('yo',result)})
      })  
    )
  }).then( success => {
    return Session.findOne({name: session.name}).exec()
  })
}


var addSession = function(sessionId, email){
  return User.findOneAndUpdate({
    'email': email
  }, {
    $push: {
      'sessions': sessionId
    }
  }).exec();
}

// problem right now is that we're trying to find the user and update 
// it with the UID and the event id but we would have to do a bunch of queries
// for each email to get the UID and THEN do another query to update again so 
// i'm trying to do it so that we just have to pass the email and do the query this way
// so i changed the schema to have an array of emails and permissions rather than ids and 
// permissions