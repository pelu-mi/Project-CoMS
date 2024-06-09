import { useQuery } from "@tanstack/react-query";

import { GET_COURSE_DETAILS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";
// import { apiRequest } from "services/helpers/apiRequest";

// const getCourseDetail = async ({ queryKey }) => {
//   const [key, courseId] = queryKey;
//   console.log("key", key);
//   console.log("courseId", courseId);
//   return await apiRequest(key, "GET", { _id: courseId });
// };

export const useCourseDetailQuery = (courseId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [GET_COURSE_DETAILS_API_KEY, courseId],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    course: data?.data ?? {},
  };
};
