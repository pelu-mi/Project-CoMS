/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { EDIT_COURSE_CONTENT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Edit Course Content Request
const editCourseContentRequest = (payload) =>
  apiRequest(EDIT_COURSE_CONTENT_API_KEY, "POST", payload);

// Custom Hook to manage Edit Course Content Request
export const useEditCourseContentMutation = (options) =>
  useMutation({
    mutationKey: [EDIT_COURSE_CONTENT_API_KEY],
    mutationFn: editCourseContentRequest,
    ...options,
  });
