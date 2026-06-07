// ===============================
// Environment Variables
// ===============================
require("dotenv").config({});


// ===============================
// Imports & Schema Setup
// ===============================
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;


// ===============================
// User Schema Definition
// ===============================
// Defines structure and validation rules for User documents
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, "PLease provide email"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
});


// ===============================
// Pre-save Hook (Hash Password)
// ===============================
// Hashes password before saving the user document
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// ===============================
// Instance Methods
// ===============================

// Generate JWT token for authentication
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME },
  );
};

// Compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};


// ===============================
// Export Model
// ===============================
module.exports = mongoose.model("User", UserSchema);
