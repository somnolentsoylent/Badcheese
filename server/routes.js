var sessionController = require('./controllers/sessionController');
// var userController = require('./controllers/userController');
const handler = require('./helpers/request-handler.js');

module.exports = function(app, express){
  // Create a new board
  app.get('/board', handler.getNewBoard);

  //session actions
  app.post('/api/sessions/addSession', sessionController.addSession);
  app.post('/api/sessions/addUser', sessionController.addUser);
  app.post('/api/sessions/deleteSession', sessionController.deleteSession);
  app.post('/api/sessions/removeUser', sessionController.removeUser);
  app.post('/api/sessions/sessionSearch', sessionController.sessionSearch);

}

// // Get a board by id
// app.get('/board/:boardId', handler.getBoard);
//
// // Archive board by id (Server to Server)
// app.post('board/:archiveId', handler.archiveBoard); 