/**
 * Import modules
 */
import mongoose from "mongoose";

/**
 * Define course model for database
 */
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: {
      relatedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },

  {
    timestamps: true,
  }
);

// Virtual field to count the number of discussions
courseSchema.virtual("discussionCount", {
  ref: "discussion",
  localField: "_id",
  foreignField: "course",
  count: true,
  match: { delete: false },
});

// Ensure virtual fields are included when converting to JSON or Object
courseSchema.set("toObject", { virtuals: true });
courseSchema.set("toJSON", { virtuals: true });

/**
 * Export course model
 */
export default mongoose.model("Course", courseSchema);
