/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { RESET_PASSWORD_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

/**
 * resetPasswordRequest - Request for resetting password
 * 
 * @param {Object} payload 
 */
const resetPasswordRequest = (payload) =>
  apiRequest(RESET_PASSWORD_API_KEY, "POST", payload);

/**
 * useResetPasswordMutation - Custom hook to manage Reset password mutation request
 * 
 * @param {Object} options 
 * @returns 
 */
export const useResetPasswordMutation = (options) =>
  useMutation({
    mutationKey: [RESET_PASSWORD_API_KEY],
    mutationFn: resetPasswordRequest,
    ...options,
  });
