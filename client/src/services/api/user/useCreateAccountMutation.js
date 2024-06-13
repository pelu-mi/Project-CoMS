/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { CREATE_ACCOUNT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Create Account Request
const createAccountRequest = (payload) =>
  apiRequest(CREATE_ACCOUNT_API_KEY, "POST", payload);

// Custom Hook to manage Create Account request
export const useCreateAccountMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_ACCOUNT_API_KEY],
    mutationFn: createAccountRequest,
    ...options,
  });
