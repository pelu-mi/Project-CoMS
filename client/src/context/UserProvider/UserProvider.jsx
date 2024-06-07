// src/contexts/UserContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST_ROUTE, LOGIN_ROUTE } from "routes";
import { createAccountApi } from "services/api/user/createAccountApi";
import { loginApi } from "services/api/user/loginApi";
import cookie from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY, ACCESS_USER_KEY } from "constants/auth";
import { useSnackbar } from "notistack";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const createAccount = async (payload) => {
    const { email, password } = payload;
    setLoading(true);

    try {
      // Create Account
      await createAccountApi(payload);
      // Call success snackbar
      enqueueSnackbar("Successfully Created Account", { variant: "success" });
      // Login
      const userResponse = await loginApi({ email, password });
      handleUserResponse(userResponse);
    } catch (error) {
      // Call error snackbar
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload, formSetError) => {
    setLoading(true);
    try {
      // Login
      const userResponse = await loginApi(payload);
      handleUserResponse(userResponse);
    } catch (error) {
      // Set form error
      formSetError("email");
      formSetError("password", { message: "Email or password is incorrect!" });
    } finally {
      setLoading(false);
    }
  };

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
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node,
};
