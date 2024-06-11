import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import {
  CREATE_ACCOUNT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
} from "routes";
import { CreateAccountPage } from "./CreateAccountPage";
import { MainPage } from "./MainPage";
import { PrivateRoute } from "components/PrivateRoute";
import { ForgotPasswordPage } from "./ForgotPasswordPage/ForgotPasswordPage";

export const Root = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={CREATE_ACCOUNT_ROUTE} element={<CreateAccountPage />} />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPasswordPage />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
