var Session = require('../../schemas/sessionSchema');

module.exports = (search) => {
  return Session.find({
    name: new RegExp(search, 'i')
  }).exec();
};