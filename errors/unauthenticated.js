// ===============================
// Imports & Dependencies
// ===============================
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');


// ===============================
// Unauthenticated Error (401)
// ===============================
// Thrown when a user attempts to access a
// protected resource without valid credentials
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


// ===============================
// Export Error Class
// ===============================
module.exports = UnauthenticatedError;
