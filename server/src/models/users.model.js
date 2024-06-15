/**
 * Import modules
 */
import mongoose from "mongoose";

/**
 * Define user model for database
 */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      required: true,
    },
    resetPin: {
      type: String,
    },
    isCompleteCourseListTour: {
      type: String,
      enum: ["true", "false"],
      default: "true",
    },
    isCompleteCourseDetailsTour: {
      type: String,
      enum: ["true", "false"],
      default: "true",
    },
  },

  {
    timestamps: true,
  }
);

/**
 * Export user model
 */
export default mongoose.model("User", userSchema);
