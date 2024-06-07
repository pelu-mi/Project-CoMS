import { useQuery } from "@tanstack/react-query";
import { getCancelableFetcher } from "services/helpers/getCancelableFetcher";

export const useCourseListQuery = (options) => {
  const { data, ...rest } = useQuery({
    queryKey: ["/user/instructorcourselist"],
    queryFn: getCancelableFetcher,
    ...options,
  });

  return {
    ...rest,
    courses: data?.data ?? [],
  };
};
