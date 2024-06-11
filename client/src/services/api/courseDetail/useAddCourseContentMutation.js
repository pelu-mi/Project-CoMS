import { useMutation } from "@tanstack/react-query";
import { ADD_COURSE_CONTENT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

const addCourseContentRequest = (payload) =>
  apiRequest(ADD_COURSE_CONTENT_API_KEY, "POST", payload);

export const useAddCourseContentMutation = (options) =>
  useMutation({
    mutationKey: [ADD_COURSE_CONTENT_API_KEY],
    mutationFn: addCourseContentRequest,
    ...options,
  });
