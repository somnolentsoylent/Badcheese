const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');
const path = require('path');

module.exports = function(app, express){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(handler.logger);

  // Serve Static Files for React
  app.use('/', express.static(path.join(__dirname, '..', 'client')));

}; 