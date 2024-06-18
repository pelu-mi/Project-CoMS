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
    forum: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

// Pre-save middleware to set the forum field to the name value if it's not provided
courseSchema.pre("save", function (next) {
  if (!this.forum) {
    this.forum = this.name;
  }
  next();
});

/**
 * Export course model
 */
export default mongoose.model("Course", courseSchema);
