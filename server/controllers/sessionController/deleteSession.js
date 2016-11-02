var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  if (!req.body.sessionId) {
    res.status(400).send('Invalid Input');
    return;
  }
  var sessionId = req.body.sessionId;
  sessionModels.deleteSession(sessionId)
  .then((success) => {
    res.status(204).send('Session deleted!');
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid input to deleteSession');
  });
};