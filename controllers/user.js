const User = require("../models/User");
async function addUser(req, res) {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.json({ username: user.username, _id: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { addUser };
