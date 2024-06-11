import axios from "axios";

export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    throw error.response?.data || new Error("An unknown error occurred");
  } else {
    throw new Error("An unknown error occurred");
  }
};
