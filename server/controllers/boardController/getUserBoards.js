// getUserBoards.js
var boardModels = require('../../models/boardModels');

module.exports = (req, res) => {
  var userId = req.body.userId;
  boardModels.getUserBoards(userId)
  .then(user => {
    res.status(201).send(user.boards);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Id Inputted');
  });
};