import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export default mongoose.model("Course", courseSchema);
