// getSessionBoards.js

module.exports = (req, res) => {
  var sessionId = req.body.sessionId;
  boardModels.getSessionBoards(sessionId)
  .then(session => {
    res.status(201).send(session.boards);
  })   
  .catch(error => {
    res.status(400).send('ERROR: Invalid Id Inputted');
  });
};