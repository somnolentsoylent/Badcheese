// getSession.js


var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  var sessionId = req.body.sessionId;
  sessionModels.getSession(sessionId)
  .then(session => {
    res.status(200).send(session);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Id Inputted');
  });
};