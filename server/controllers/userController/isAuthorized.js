module.exports = (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.send('User authorized');
  } else {
    res.send('User not authorized')
  }
}
