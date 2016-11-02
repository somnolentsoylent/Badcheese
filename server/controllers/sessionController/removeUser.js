var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  var sessionId = req.body.sessionId;
  var userId = req.body.userId;
  sessionModels.removeUser(sessionId, userId)
  .then(success => {
    res.status(201).send('User removed!');
  })   
  .catch(error => {
    console.log(error)
    res.status(400).send('Error while attempting to remove user from session');
  });
};