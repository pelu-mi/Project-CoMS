/**
 * Import modules
 */
import axios from "axios";
import cookie from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY } from "constants/auth";
import {
  CREATE_ACCOUNT_API_KEY,
  FORGOT_PASSWORD_API_KEY,
  LOGIN_API_KEY,
} from "./constants";

// Endpoints to be excluded
const EXCLUDED_ENDPOINTS = [
  LOGIN_API_KEY,
  CREATE_ACCOUNT_API_KEY,
  FORGOT_PASSWORD_API_KEY,
];

/**
 * Configure Axios instance
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Handle Endpoints by adding jwt token to appropriate URLs
 */
apiClient.interceptors.request.use((config) => {
  if (config.url && !EXCLUDED_ENDPOINTS.includes(config.url)) {
    const token = cookie.get(ACCESS_TOKEN_COOKIE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
