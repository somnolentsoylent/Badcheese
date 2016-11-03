var sessionController = require('./controllers/sessionController');
var userController = require('./controllers/userController');
var boardController = require('./controllers/boardController');
const handler = require('./helpers/request-handler.js');
const passport = require('passport');

module.exports = function(app, express){
  // Create a new board
  app.get('/board', handler.getNewBoard);
  app.get('/api/users/auth', userController.isAuthorized);
  app.post('/api/users/login', passport.authenticate('local'), function(req, res) {
    res.status(201).send(req.user);
  });
  app.post('/api/users/signup', userController.signup);

  //session actions
  app.post('/api/sessions/addSession', sessionController.addSession);
  app.post('/api/sessions/addUser', sessionController.addUser);
  app.post('/api/sessions/deleteSession', sessionController.deleteSession);
  app.post('/api/sessions/removeUser', sessionController.removeUser);
  app.post('/api/sessions/sessionSearch', sessionController.sessionSearch);

  app.post('/api/boards/addBoardToSession', boardController.addBoardToSession);
  app.post('/api/boards/addBoardToUser', boardController.addBoardToUser);
  app.post('/api/boards/deleteBoardFromUser', boardController.deleteBoardFromUser);
  app.post('/api/boards/getSessionBoards', boardController.getSessionBoards);
  app.post('/api/boards/getUserBoards', boardController.getUserBoards);

}

// // Get a board by id
// app.get('/board/:boardId', handler.getBoard);
//
// // Archive board by id (Server to Server)
// app.post('board/:archiveId', handler.archiveBoard);
