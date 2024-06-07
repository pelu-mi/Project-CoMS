import axios from "axios";
import { apiClient } from "services/apiClient";
import { handleApiError } from "./handleApiError";

export const getCancelableFetcher = async ({ queryKey }) => {
  const [key, params] = queryKey;
  const source = axios.CancelToken.source();

  try {
    const response = await apiClient.get(key, {
      cancelToken: source.token,
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
