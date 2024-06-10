import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref :"Course",
    required: true,
  },
});

export default mongoose.model("CourseContent", courseContentSchema);
