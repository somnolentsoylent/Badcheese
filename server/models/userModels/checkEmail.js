const Promise = require('bluebird');
const User = require('../../schemas/userSchema.js');

module.exports = (emailAdd) => {
  return User.findOne({'email': emailAdd})
  .then(user => {
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        reject('No email found');
      }
    })
  })
}
