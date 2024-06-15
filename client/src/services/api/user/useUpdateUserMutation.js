/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { UPDATET_USER_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Update User Request
const updateUserRequest = (payload) =>
  apiRequest(UPDATET_USER_API_KEY, "POST", payload);

// Custom Hook to manage Update User request
export const useUpdateUserMutation = (options) =>
  useMutation({
    mutationKey: [UPDATET_USER_API_KEY],
    mutationFn: updateUserRequest,
    ...options,
  });
