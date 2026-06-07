// Hello wena

// =======================
// Imports & Dependencies
// =======================
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


// =======================
// Register Controller
// =======================
const register = async (req, res) => {
  // Create new user in DB
  const user = await User.create({ ...req.body });

  // Generate JWT token
  const token = user.createJWT();

  // Send response
  res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
};


// =======================
// Login Controller
// =======================
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Generate JWT token
  const token = user.createJWT();

  // Successful login response
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};


// =======================
// Export Controllers
// =======================
module.exports = {
  register,
  login,
};
