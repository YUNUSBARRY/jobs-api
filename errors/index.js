// ===============================
// Error Exports Index
// ===============================
// Centralizes and re‑exports all custom error classes
const CustomAPIError = require('./custom-api');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');


// ===============================
// Export Error Modules
// ===============================
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
