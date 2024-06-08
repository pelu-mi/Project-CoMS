import { useMutation } from "@tanstack/react-query";
import { CREATE_ACCOUNT_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

const createAccountRequest = (payload) =>
  apiRequest(CREATE_ACCOUNT_API_KEY, "POST", payload);

export const useCreateAccountMutation = (options) =>
  useMutation({
    mutationKey: [CREATE_ACCOUNT_API_KEY],
    mutationFn: createAccountRequest,
    ...options,
  });
