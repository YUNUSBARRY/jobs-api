// Import Job model (MongoDB collection)
const Job = require("../models/Job");

// Import HTTP status codes (e.g., 200, 201, 400)
const { StatusCodes } = require("http-status-codes");

// Import custom error classes
const { BadRequestError, NotFoundError } = require("../errors");

// ===============================
// Get all jobs (placeholder)
// ===============================
const getAllJobs = async (req, res) => {
  // Will return all jobs created by the logged-in user
  res.send("get all jobs");
};

// ===============================
// Get single job (placeholder)
// ===============================
const getJob = async (req, res) => {
  // Will return one job using job ID
  res.send("get job");
};

// ===============================
// Create a new job
// ===============================
const createJob = async (req, res) => {
  // Attach logged-in user's ID to the job
  req.body.createdBy = req.user.userId;

  // Create job in database
  const job = await Job.create({ ...req.body });

  // Send response with status 201 (Created)
  res.status(StatusCodes.CREATED).json({ job });
};

// ===============================
// Update job (placeholder)
// ===============================
const updateJob = async (req, res) => {
  // Will update job using job ID
  res.send("Update job");
};

// ===============================
// Delete job (placeholder)
// ===============================
const deleteJob = async (req, res) => {
  // Will delete job using job ID
  res.send("Delete job");
};

// Export all controller functions
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
