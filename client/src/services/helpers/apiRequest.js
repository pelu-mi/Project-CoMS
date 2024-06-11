import axios from "axios";
import { apiClient } from "services/apiClient";
import { handleApiError } from "./handleApiError";

export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  options = {}
) => {
  const source = axios.CancelToken.source();

  try {
    const config = {
      url,
      method,
      data,
      cancelToken: source.token,
      ...options,
    };
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  } finally {
    source.cancel();
  }
};
