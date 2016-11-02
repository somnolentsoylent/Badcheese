module.exports = (req, res) => {
  if (req.user) {
    res.send('User authorized');
  } else {
    res.send('User not authorized')
  }
}
