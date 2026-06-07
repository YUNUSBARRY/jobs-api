// ===============================
// Imports & Dependencies
// ===============================
const CustomAPIError = require('./custom-api');
const { StatusCodes } = require('http-status-codes');


// ===============================
// Not Found Error (404)
// ===============================
// Extends CustomAPIError and assigns the
// HTTP 404 Not Found status code
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}


// ===============================
// Export Error Class
// ===============================
module.exports = NotFoundError;
