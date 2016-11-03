var sessionModels = require('../../models/sessionModels');
var Session = require('../../schemas/sessionSchema');


module.exports = (req, res) => {
  if (!req.body.sessionId || !req.body.userId || !req.body.permission) {
    console.log('not found!')
    res.status(400).send('Invalid Input');
    return;
  }

  var sessionId = req.body.sessionId;
  var userId = req.body.userId; 
  var permission = req.body.permission;

  sessionModels.addUser(sessionId, userId, permission)
  .then((success) => {
    res.sendStatus(201);
  })
  .catch( err => {
    console.log(err);
    res.status(400).send('Error when trying to add User to Session');
  });
};
