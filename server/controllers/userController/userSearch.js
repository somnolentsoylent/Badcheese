// userSearch.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var search = req.params.search;
  userModels.userSearch(search)
  .then(user => {
    res.status(200).send(user);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Search Inputted');
  });
}
