const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');
const path = require('path');
const flash = require('connect-flash')
const passport = require('passport');

module.exports = function(app, express){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(handler.logger);
  app.use(flash());
  // Serve Static Files for React
  app.use('/', express.static(path.join(__dirname, '..', 'client')));
  app.use(require('express-session')({secret: 'drawmie', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());
};
