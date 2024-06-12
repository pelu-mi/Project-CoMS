import { useMutation } from "@tanstack/react-query";
import { RESET_PASSWORD_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

const resetPasswordRequest = (payload) =>
  apiRequest(RESET_PASSWORD_API_KEY, "POST", payload);

export const useResetPasswordMutation = (options) =>
  useMutation({
    mutationKey: [RESET_PASSWORD_API_KEY],
    mutationFn: resetPasswordRequest,
    ...options,
  });
