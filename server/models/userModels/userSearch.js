// userSearch.js
const User = require('../../schemas/userSchema.js');

module.exports = (search) => {
  return User.find({$text: {$search: search}}, {email: 1}).exec()
}
