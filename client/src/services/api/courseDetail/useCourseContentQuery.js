/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";

import { GET_COURSE_CONTENT_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

/**
 * useCourseContentQuery - Custom Hook to retrieve Course Content
 *                         and manage the state
 * 
 * @param {Object} options 
 */
export const useCourseContentQuery = (courseId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${GET_COURSE_CONTENT_API_KEY}/${courseId}`],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    contents: data?.data ?? [],
  };
};
