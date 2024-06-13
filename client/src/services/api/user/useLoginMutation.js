/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { LOGIN_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Login Request
const loginRequest = (payload) => apiRequest(LOGIN_API_KEY, "POST", payload);

// Custom Hook to manage login request
export const useLoginMutation = (options) =>
  useMutation({
    mutationKey: [LOGIN_API_KEY],
    mutationFn: loginRequest,
    ...options,
  });
