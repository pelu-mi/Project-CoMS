/**
 * Import Modules
 */
// src/contexts/UserContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST_ROUTE, LOGIN_ROUTE } from "routes";
import { useCreateAccountMutation } from "services/api/user/useCreateAccountMutation";

import cookie from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY, ACCESS_USER_KEY } from "constants/auth";
import { useSnackbar } from "notistack";
import { useLoginMutation } from "services/api/user/useLoginMutation";

const UserContext = createContext();

/**
 * User Provider
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem(ACCESS_USER_KEY)) || null
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Handle User Response
  const handleUserResponse = (userResponse) => {
    const { firstName, lastName, email, role, accessToken } = userResponse.data;
    setUser({ firstName, lastName, email, role });
    localStorage.setItem(
      ACCESS_USER_KEY,
      JSON.stringify({ firstName, lastName, email, role })
    );

    cookie.set(ACCESS_TOKEN_COOKIE_KEY, accessToken);
    navigate(COURSE_LIST_ROUTE);
  };

  // Handle success or error
  const { mutateAsync: createAccount, isPending: isCreateAccountPending } =
    useCreateAccountMutation({
      onSuccess: async (response, requestPayload) => {
        const { email, password } = requestPayload;
        enqueueSnackbar(response.message, { variant: "success" });

        await login({ email, password });
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });

  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation({
    onSuccess: async (response) => {
      handleUserResponse(response);
    },
  });

  const logout = () => {
    localStorage.removeItem(ACCESS_USER_KEY);
    cookie.remove(ACCESS_TOKEN_COOKIE_KEY);
    setUser(null);
    navigate(LOGIN_ROUTE);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createAccount,
        login,
        logout,
        loading: isCreateAccountPending || isLoginPending,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Export Function
 */
export const useUser = () => useContext(UserContext);

// Specify types of props to be received by UserProvider
UserProvider.propTypes = {
  children: PropTypes.node,
};
