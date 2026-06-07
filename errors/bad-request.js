// ===============================
// Imports & Dependencies
// ===============================
const CustomAPIError = require("./custom-api");
const { StatusCodes } = require("http-status-codes");


// ===============================
// Bad Request Error (400)
// ===============================
// Extends the base CustomAPIError and assigns
// the HTTP 400 Bad Request status code
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}


// ===============================
// Export Error Class
// ===============================
module.exports = BadRequestError;
