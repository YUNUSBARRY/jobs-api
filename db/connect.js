// ===============================
// MongoDB Connection (Mongoose)
// ===============================
const mongoose = require("mongoose");


// ===============================
// Connect to Database
// ===============================
// Accepts a MongoDB connection string (url)
// Returns the mongoose connection promise
const connectDB = (url) => {
  return mongoose.connect(url);
};


// ===============================
// Export Function
// ===============================
module.exports = connectDB;
