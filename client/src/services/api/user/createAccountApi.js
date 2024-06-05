import { apiClient } from "services/apiClient";

export const createAccountApi = async (payload) => {
  try {
    const response = await apiClient.post("/user/createaccount", payload);
    return response.data;
  } catch (error) {
    if (apiClient.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
