/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { ADD_COURSE_CONTENT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Add Course Content Request
const addCourseContentRequest = (payload) =>
  apiRequest(ADD_COURSE_CONTENT_API_KEY, "POST", payload);

// Custom Hook to manage Course Content Request
export const useAddCourseContentMutation = (options) =>
  useMutation({
    mutationKey: [ADD_COURSE_CONTENT_API_KEY],
    mutationFn: addCourseContentRequest,
    ...options,
  });
