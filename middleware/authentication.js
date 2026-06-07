// ===============================
// Imports & Dependencies
// ===============================
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");


// ===============================
// Authentication Middleware
// ===============================
// Verifies JWT token and attaches user info to req.user
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validate Authorization header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token and extract payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = { userId: payload.userId, name: payload.name };

    // Continue to next middleware/controller
    next();
  } catch (error) {
    // Invalid or expired token
    throw new UnauthenticatedError("Authentication invalid");
  }
};


// ===============================
// Export Middleware
// ===============================
module.exports = auth;
