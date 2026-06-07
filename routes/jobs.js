// ===============================
// Jobs Routes
// ===============================
// Handles CRUD operations for job resources
const express = require("express");
const router = express.Router();


// ===============================
// Controllers
// ===============================
const {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
} = require("../controllers/jobs");


// ===============================
// Route Definitions
// ===============================
// Get all jobs / Create new job
router.route("/").get(getAllJobs).post(createJob);

// Get single job / Update job / Delete job
router.route("/:jobId").get(getJob).patch(updateJob).delete(deleteJob);


// ===============================
// Export Router
// ===============================
module.exports = router;
