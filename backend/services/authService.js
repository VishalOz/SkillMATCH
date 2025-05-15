const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, 
      email: user.email,
      role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" });
  return { token,
     user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
     } 
    };
};

module.exports = { register, login };