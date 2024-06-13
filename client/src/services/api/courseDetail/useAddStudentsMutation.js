/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { ADD_STUDENTS_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Add students Request
const addStudentsRequest = (payload) =>
  apiRequest(ADD_STUDENTS_API_KEY, "POST", payload);

// Custom Hook to manage Add Students Request
export const useAddStudentsMutation = (options) =>
  useMutation({
    mutationKey: [ADD_STUDENTS_API_KEY],
    mutationFn: addStudentsRequest,
    ...options,
  });
