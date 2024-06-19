/**
 * Import Modules
 */
import { useMutation } from "@tanstack/react-query";
import { TURN_OFF_GUIDES_API_KEY } from "services/constants";
import { apiRequest } from "services/helpers/apiRequest";

// Turn off Guides Request
const turnOffGuidesRequest = (payload) =>
  apiRequest(TURN_OFF_GUIDES_API_KEY, "POST", payload);

// Custom Hook to manage Turn off Guides Request
export const useTurnOffGuidesMutation = (options) =>
  useMutation({
    mutationKey: [TURN_OFF_GUIDES_API_KEY],
    mutationFn: turnOffGuidesRequest,
    ...options,
  });
