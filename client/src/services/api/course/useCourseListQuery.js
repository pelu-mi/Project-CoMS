/**
 * Import Modules
 */
import { useQuery } from "@tanstack/react-query";
import { ROLES } from "constants/role";
import {
  GET_INSTRUCTOR_COURSES_API_KEY,
  GET_STUDENT_COURSES_API_KEY,
} from "services/constants";
import { apiGetRequest } from "services/helpers/apiGetRequest";

/**
 * useCourseListQuery - Custom Hook to fetch a course list based on user type
 *                      and manage the state
 * 
 * @param {Object} options - Additional config options
 * @param {Object} role - Role of the user 
 */
export const useCourseListQuery = (role, options) => {
  const apiKey =
    role === ROLES.instructor
      ? GET_INSTRUCTOR_COURSES_API_KEY
      : GET_STUDENT_COURSES_API_KEY;

  const { data, ...rest } = useQuery({
    queryKey: [apiKey],
    queryFn: apiGetRequest,
    ...options,
  });

  return {
    ...rest,
    courses: data?.data ?? [],
  };
};
