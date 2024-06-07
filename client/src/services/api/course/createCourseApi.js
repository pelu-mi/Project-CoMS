import { apiClient } from "services/apiClient";
import { handleApiError } from "services/helpers/handleApiError";

export const createCourseApi = async (payload) => {
  try {
    const response = await apiClient.post("/user/createcourse", payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
