import { useUser } from "context/UserProvider/UserProvider";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user ? <>{children}</> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
