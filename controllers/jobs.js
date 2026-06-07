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
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// ===============================
// Get single job (placeholder)
// ===============================
const getJob = async (req, res) => {
  // Will return one job using job ID
  const {
    user: { userId },
    params: { jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
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
  const {
    user: { userId },
    params: { jobId },
    body,
  } = req;

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    body,
    { returnDocument: 'after', runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// ===============================
// Delete job (placeholder)
// ===============================
const deleteJob = async (req, res) => {
  const {
    params: { jobId },
    user: { userId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

// Export all controller functions
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};