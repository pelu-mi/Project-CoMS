/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { TURN_ON_GUIDES_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Turn on Guides Request
const turnOnGuidesRequest = (payload) =>
  apiRequest(TURN_ON_GUIDES_API_KEY, "POST", payload);

// Custom Hook to manage Turn on Guides Request
export const useTurnOnGuidesMutation = (options) =>
  useMutation({
    mutationKey: [TURN_ON_GUIDES_API_KEY],
    mutationFn: turnOnGuidesRequest,
    ...options,
  });
