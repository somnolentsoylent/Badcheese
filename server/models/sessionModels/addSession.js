var Session = require('../../schemas/sessionSchema');

//add session to the database
module.exports = (session) => {
  var newSession = new Session(session);

  return newSession.save();
}