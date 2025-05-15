const User = require("../models/user");
const bcrypt = require ('bcryptjs')

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};