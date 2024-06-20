/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { CREATE_DISCUSSION_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Create Discussion Request
const createDiscussionRequest = (payload) =>
  apiRequest(CREATE_DISCUSSION_API_KEY, "POST", payload);

// Custom hook to manage Create Discussion request
export const useCreateDiscussionMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_DISCUSSION_API_KEY],
    mutationFn: createDiscussionRequest,
    ...options,
  });
