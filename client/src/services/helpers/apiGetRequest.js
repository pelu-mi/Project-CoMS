import { apiRequest } from "./apiRequest";

export const apiGetRequest = async ({ queryKey }) => {
  const [key, params] = queryKey;

  return await apiRequest(key, "GET", null, { params });
};
