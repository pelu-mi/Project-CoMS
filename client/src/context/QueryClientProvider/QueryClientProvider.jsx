/**
 * Import Modules
 */
import PropTypes from "prop-types";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

/**
 * Query Client Provider
 */
export const QueryClientProvider = ({ children }) => {
  const showDevTools =
    import.meta.env.VITE_SHOW_REACT_QUERY_DEVTOOLS === "true";

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      {showDevTools && <ReactQueryDevtools />}
    </ReactQueryClientProvider>
  );
};

// Specify types of props to be received by QueryClientProvider
QueryClientProvider.propTypes = {
  children: PropTypes.node,
};
