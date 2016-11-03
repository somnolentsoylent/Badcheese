const User = require('../../models/userModels/index.js');

module.exports = (req, res) => {
  User.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.photo)
    .then(user => {
      res.send(user.email);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}
