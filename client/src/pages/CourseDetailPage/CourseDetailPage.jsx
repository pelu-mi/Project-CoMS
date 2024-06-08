import { useParams } from "react-router-dom";

export const CourseDetailPage = () => {
  let { courseId } = useParams();
  return <h1>Course Id: {courseId}</h1>;
};
