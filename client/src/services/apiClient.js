/**
 * Import modules
 */
import axios from "axios";
import cookie from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY } from "constants/auth";

// Endpoints to be excluded
const EXCLUDED_ENDPOINTS = ["/user/login", "/user/createaccount"];

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  if (config.url && !EXCLUDED_ENDPOINTS.includes(config.url)) {
    const token = cookie.get(ACCESS_TOKEN_COOKIE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
