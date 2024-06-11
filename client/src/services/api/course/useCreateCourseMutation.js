import { useMutation } from "@tanstack/react-query";
import { CREATE_COURSE_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

const createCourseRequest = (payload) =>
  apiRequest(CREATE_COURSE_API_KEY, "POST", payload);

export const useCreateCourseMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_COURSE_API_KEY],
    mutationFn: createCourseRequest,
    ...options,
  });
