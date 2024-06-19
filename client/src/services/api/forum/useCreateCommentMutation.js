/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { CREATE_COMMENT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Create Comment Request
const createCommentRequest = (payload) =>
  apiRequest(CREATE_COMMENT_API_KEY, "POST", payload);

// Custom hook to manage Create Comment request
export const useCreateCommentMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_COMMENT_API_KEY],
    mutationFn: createCommentRequest,
    ...options,
  });
