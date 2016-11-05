// userSearch.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var search = req.body.search;
  console.log(search)
  userModels.userSearch(search)
  .then(user => {
    console.log(user)
    res.status(200).send(user);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Search Inputted');
  });
}
