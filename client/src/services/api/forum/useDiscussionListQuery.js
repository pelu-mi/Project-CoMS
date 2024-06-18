/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";
import { GET_DISCUSSIONS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

export const useDiscussionListQuery = (courseId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${GET_DISCUSSIONS_API_KEY}/${courseId}`],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    courseName: data?.name ?? "",
    discussions: data?.data ?? [],
  };
};
