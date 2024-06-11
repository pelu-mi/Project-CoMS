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
      ref :'User',
      required: true,
    },
    students:{
        relatedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
      }
  },

  {
    timestamps: true,
  }
);

/**
 * Export course model
 */
export default mongoose.model("Course", courseSchema);
