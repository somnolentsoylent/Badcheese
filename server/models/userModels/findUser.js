const Promise = require('bluebird');
const User = require('../../schemas/userSchema.js');

module.exports = (id) => {
  return User.findOne({'_id': id})
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
