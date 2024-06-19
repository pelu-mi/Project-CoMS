/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";
import { GET_COMMENTS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

export const useCommentListQuery = (discussionId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${GET_COMMENTS_API_KEY}/${discussionId}`],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    discussionDetails: data?.discussionDetails ?? {},
    comments: data?.data ?? [],
  };
};
