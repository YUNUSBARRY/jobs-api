
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  { timestamps: true },
);

module.exports = mongoose.model("Job", JobSchema);