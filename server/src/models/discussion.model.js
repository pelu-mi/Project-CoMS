/**
 * Import modules
 */
import mongoose from "mongoose";

/**
 * Define discussion model for database
 */
const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Export discussion Model
 */
export default mongoose.model("discussion", discussionSchema);
