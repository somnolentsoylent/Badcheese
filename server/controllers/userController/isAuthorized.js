module.exports = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('User not authorized');
  }
}
