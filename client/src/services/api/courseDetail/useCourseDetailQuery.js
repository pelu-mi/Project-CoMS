/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";

import { GET_COURSE_DETAILS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

/**
 * useCourseDetailQuery - Custom Hook to fetch course details
 *                        and manage the state
 * 
 * @param {Object} options 
 */
export const useCourseDetailQuery = (courseId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${GET_COURSE_DETAILS_API_KEY}/${courseId}`],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    course: data?.data ?? {},
  };
};
