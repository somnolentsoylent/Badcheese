const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModels/index.js');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(username, password, done) {
      User.checkEmail(username)
          .then(user => {
            return user.checkPassword(password)
          })
          .then(isMatch => {
            done(null, user);
          })
          .catch(err => {
            done(err);
          })
  }));
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findUser(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
}
