/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { EDIT_COURSE_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Edit Course Request
const editCourseRequest = (payload) =>
  apiRequest(EDIT_COURSE_API_KEY, "POST", payload);

// Custom hook to manage Edit Course Request
export const useEditCourseMutation = (options) =>
  useMutation({
    mutationKey: [EDIT_COURSE_API_KEY],
    mutationFn: editCourseRequest,
    ...options,
  });
