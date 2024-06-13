/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";

import { GET_REGISTERED_STUDENTS_API_KEY } from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

/**
* useRegisteredStudentsQuery - Custom Hook to fetch a list of registered students
*                              and manage the state
* 
* @param {Object} options 
*/
export const useRegisteredStudentsQuery = (courseId, options) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${GET_REGISTERED_STUDENTS_API_KEY}/${courseId}`],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    registeredStudents: data?.data ?? [],
  };
};
