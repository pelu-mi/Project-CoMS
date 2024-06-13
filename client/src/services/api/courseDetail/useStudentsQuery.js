/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";

import { GET_STUDENTS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

/**
 * useStudentsQuery - Custom Hook to fetch a list of students
 *                    and manage the state
 * 
 * @param {Object} options 
 */
export const useStudentsQuery = (options) => {
  const { data, ...rest } = useQuery({
    queryKey: [GET_STUDENTS_API_KEY],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    students: data?.data ?? [],
  };
};
