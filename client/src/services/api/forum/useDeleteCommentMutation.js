/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { DELETE_COMMENT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Delete Comment Request
const deleteCommentRequest = (payload) =>
  apiRequest(DELETE_COMMENT_API_KEY, "POST", payload);

// Custom hook to manage Delete Comment request
export const useDeleteCommentMutation = (options) =>
  useMutation({
    mutationKey: [DELETE_COMMENT_API_KEY],
    mutationFn: deleteCommentRequest,
    ...options,
  });
