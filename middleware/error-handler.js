// ===============================
// Imports & Dependencies
// ===============================
const { StatusCodes } = require("http-status-codes");


// ===============================
// Global Error Handler
// ===============================
// Normalizes error responses and handles common Mongoose errors
const errorHandlerMiddleware = (error, req, res, next) => {
  // Default error structure
  let customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong please try again later",
  };

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    customError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  // Mongoose invalid ObjectId (CastError)
  if (error.name === "CastError") {
    customError.message = `No item found with id: ${error.value}`;
    customError.statusCode = 404;
  }

  // Duplicate key error (e.g., unique fields)
  if (error.code && error.code === 11000) {
    customError.message = `Duplicate value entered for [${Object.keys(
      error.keyValue
    )}] field, please enter another value`;
    customError.statusCode = 400;
  }

  // Final response
  return res
    .status(customError.statusCode)
    .json({ msg: customError.message });
};


// ===============================
// Export Middleware
// ===============================
module.exports = errorHandlerMiddleware;
