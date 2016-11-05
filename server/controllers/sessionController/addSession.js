var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  var session = req.body;
  console.log(session)
  sessionModels.addSession(session)
  .then(success => {
    console.log(success)
    res.status(201).send(success._id);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Session Inputted');
  });
};