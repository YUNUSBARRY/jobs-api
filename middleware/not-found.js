// ===============================
// Not Found Middleware
// ===============================
// Handles requests made to undefined routes
const notFound = (req, res) => 
  res.status(404).send("Route does not exist");


// ===============================
// Export Middleware
// ===============================
module.exports = notFound;
