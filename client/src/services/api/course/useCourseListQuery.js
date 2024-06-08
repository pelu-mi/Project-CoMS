import { useQuery } from "@tanstack/react-query";
import { GET_COURSES_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

export const useCourseListQuery = (options) => {
  const { data, ...rest } = useQuery({
    queryKey: [GET_COURSES_API_KEY],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    courses: data?.data ?? [],
  };
};
