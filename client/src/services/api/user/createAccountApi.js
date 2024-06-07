import { apiClient } from "services/apiClient";
import { handleApiError } from "services/helpers/handleApiError";

export const createAccountApi = async (payload) => {
  try {
    const response = await apiClient.post("/user/createaccount", payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
