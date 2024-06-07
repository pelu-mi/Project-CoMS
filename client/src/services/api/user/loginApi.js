import { apiClient } from "services/apiClient";
import { handleApiError } from "services/helpers/handleApiError";

export const loginApi = async (payload) => {
  try {
    const response = await apiClient.post("/user/login", payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
