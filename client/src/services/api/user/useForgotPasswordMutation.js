import { useMutation } from "@tanstack/react-query";
import { FORGOT_PASSWORD_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

const forgotPasswordRequest = (payload) =>
  apiRequest(FORGOT_PASSWORD_API_KEY, "POST", payload);

export const useForgotPasswordMutation = (options) =>
  useMutation({
    mutationKey: [FORGOT_PASSWORD_API_KEY],
    mutationFn: forgotPasswordRequest,
    ...options,
  });
