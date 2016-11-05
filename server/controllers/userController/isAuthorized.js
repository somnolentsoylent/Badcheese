module.exports = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).body('User not authorized');
  }
}
