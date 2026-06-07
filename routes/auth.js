// ===============================
// Auth Routes
// ===============================
// Handles registration and login endpoints
const express = require("express");
const router = express.Router();


// ===============================
// Controllers
// ===============================
const { register, login } = require("../controllers/auth");


// ===============================
// Route Definitions
// ===============================
// Register new user
router.route("/register").post(register);

// Login existing user
router.route("/login").post(login);


// ===============================
// Export Router
// ===============================
module.exports = router;
