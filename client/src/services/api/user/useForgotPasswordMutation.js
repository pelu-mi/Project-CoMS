/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { FORGOT_PASSWORD_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Forgot Password Request
const forgotPasswordRequest = (payload) =>
  apiRequest(FORGOT_PASSWORD_API_KEY, "POST", payload);

// Custom Hook to manage Forgot password request
export const useForgotPasswordMutation = (options) =>
  useMutation({
    mutationKey: [FORGOT_PASSWORD_API_KEY],
    mutationFn: forgotPasswordRequest,
    ...options,
  });
