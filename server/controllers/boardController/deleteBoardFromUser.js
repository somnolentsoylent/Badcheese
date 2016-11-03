// deleteBoardFromUser.js

module.exports = (req, res) => {
  var boardId = req.body.boardId;
  var userId = req.body.userId;
  boardModels.deleteBoardFromUser(boardId, userId)
  .then(success => {
    res.status(201).send('User Board Added!');
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Session Inputted');
  });
};