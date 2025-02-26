/**
 * Import Modules
 */
import { useUser } from "context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Specify types of props to be received by PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
