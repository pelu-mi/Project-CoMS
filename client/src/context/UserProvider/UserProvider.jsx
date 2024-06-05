// src/contexts/UserContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST_ROUTE, LOGIN_ROUTE } from "routes";
import { createAccountApi } from "services/api/user/createAccountApi";
import { loginApi } from "services/api/user/loginApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createAccount = async (userPayload) => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await createAccountApi(userPayload);
      const { firstName, lastName, email, role } = userResponse.data;

      setUser({ firstName, lastName, email, role });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ firstName, lastName, email, role })
      );
      navigate(COURSE_LIST_ROUTE);
    } catch (error) {
      setError(error.message || "An unknown error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await loginApi(payload);
      const { firstName, lastName, email, role } = userResponse.data;

      setUser({ firstName, lastName, email, role });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ firstName, lastName, email, role })
      );
      navigate(COURSE_LIST_ROUTE);
    } catch (error) {
      setError(error.message || "An unknown error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate(LOGIN_ROUTE);
  };

  return (
    <UserContext.Provider
      value={{ user, createAccount, login, logout, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node,
};
