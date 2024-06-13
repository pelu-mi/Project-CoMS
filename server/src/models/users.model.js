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
  },

  {
    timestamps: true,
  }
);

/**
 * Export user model
 */
export default mongoose.model("User", userSchema);
