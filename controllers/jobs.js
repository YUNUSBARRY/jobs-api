// ===============================
// Imports & Dependencies
// ===============================
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");


// ===============================
// Get All Jobs
// ===============================
const getAllJobs = async (req, res) => {
  // Fetch all jobs created by the logged‑in user
  const jobs = await Job.find({ createdBy: req.user.userId });

  // Return jobs with count
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};


// ===============================
// Get Single Job
// ===============================
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { jobId },
  } = req;

  // Find job by ID and owner
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  // Handle missing job
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // Return job
  res.status(StatusCodes.OK).json({ job });
};


// ===============================
// Create Job
// ===============================
const createJob = async (req, res) => {
  // Attach owner ID to job
  req.body.createdBy = req.user.userId;

  // Create job entry
  const job = await Job.create({ ...req.body });

  // Return created job
  res.status(StatusCodes.CREATED).json({ job });
};


// ===============================
// Update Job
// ===============================
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { jobId },
    body,
  } = req;

  // Update job with validation
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    body,
    { returnDocument: 'after', runValidators: true },
  );

  // Handle missing job
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // Return updated job
  res.status(StatusCodes.OK).json({ job });
};


// ===============================
// Delete Job
// ===============================
const deleteJob = async (req, res) => {
  const {
    params: { jobId },
    user: { userId },
  } = req;

  // Delete job by ID and owner
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  // Handle missing job
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // Confirm deletion
  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};


// ===============================
// Exports
// ===============================
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
