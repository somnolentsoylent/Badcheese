const Promise = require('bluebird');
const User = require('../../schemas/userSchema.js');

module.exports = (firstName, lastName, email, password, photo) => {
  if(!photo) {
    photo = 'https://s-media-cache-ak0.pinimg.com/236x/82/49/f2/8249f21c72876f28d1ac44cdb2023eb6.jpg'
  }
  return Promise.promisify(User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    photo: photo
  }));
}
