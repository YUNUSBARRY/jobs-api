// ===============================
// Base Custom API Error
// ===============================
// Extends the built‑in Error class and serves
// as the parent class for all custom errors
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}


// ===============================
// Export Base Error Class
// ===============================
module.exports = CustomAPIError;
