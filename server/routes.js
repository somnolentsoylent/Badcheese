var sessionController = require('./controllers/sessionController');
// var userController = require('./controllers/userController');

module.exports = function(app, express){
  //session actions
  app.post('/api/sessions/createSession', sessionController.createSession);
}