/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { CREATE_COURSE_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Create Course Request
const createCourseRequest = (payload) =>
  apiRequest(CREATE_COURSE_API_KEY, "POST", payload);

// Custom hook to manage Create Course request
export const useCreateCourseMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_COURSE_API_KEY],
    mutationFn: createCourseRequest,
    ...options,
  });
