// getUserSessions.js

var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var userId = req.body.userId;
  userModels.getUserSessions(userId)
  .then(user => {
    res.status(200).send(user.sessions);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Id Inputted');
  });
};