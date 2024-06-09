import { useQuery } from "@tanstack/react-query";

import { GET_COURSE_CONTENT_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

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
