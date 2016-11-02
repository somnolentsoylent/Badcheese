var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  var session = req.body;
  sessionModels.addSession(session)
  .then(success => {
    // console.log(success)
    res.status(201).send('Session created!');
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Session Inputted');
  });
};