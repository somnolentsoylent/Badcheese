var sessionModels = require('../../models/sessionModels');

module.exports = (req, res) => {
  var search = req.body.search;
  sessionModels.sessionSearch(search)
  .then(sessions => {
    res.status(200).send(sessions);
  })   
  .catch(error => {
    res.status(400).send('Error while searching sessions');
  });
};