/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { DELETE_DISCUSSION_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Delete Discussion Request
const deleteDiscussionRequest = (payload) =>
  apiRequest(DELETE_DISCUSSION_API_KEY, "POST", payload);

// Custom hook to manage Delete Discussion request
export const useDeleteDiscussionMutation = (options) =>
  useMutation({
    mutationKey: [DELETE_DISCUSSION_API_KEY],
    mutationFn: deleteDiscussionRequest,
    ...options,
  });
