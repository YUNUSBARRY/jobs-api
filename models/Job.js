// ===============================
// Imports & Schema Setup
// ===============================
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// ===============================
// Job Schema Definition
// ===============================
// Defines structure and validation rules for Job documents
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 50,
    },

    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["Interview", "Declined", "Pending"],
      default: "Pending",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: ["Please provide user"],
    },
  },

  // Automatically adds createdAt & updatedAt timestamps
  {
    timestamps: true,
  }
);


// ===============================
// Export Model
// ===============================
module.exports = mongoose.model("Job", JobSchema);
