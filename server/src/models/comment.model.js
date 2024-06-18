/**
 * Import modules
 */
import mongoose from "mongoose";

/**
 * Define comment model for database
 */
const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    discussion: {
      type: mongoose.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Export comment Model
 */
export default mongoose.model("comment", commentSchema);
