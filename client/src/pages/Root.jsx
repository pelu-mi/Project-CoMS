import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import {
  CREATE_ACCOUNT_ROUTE,
  FORGET_PASSWORD_ROUTE,
  LOGIN_ROUTE,
} from "routes";
import { CreateAccountPage } from "./CreateAccountPage";
import { MainPage } from "./MainPage";
import { PrivateRoute } from "components/PrivateRoute";
import { FrogetPasswordPage } from "./ForgetPasswordPage/ForgetPasswordPage";

export const Root = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={CREATE_ACCOUNT_ROUTE} element={<CreateAccountPage />} />
      <Route path={FORGET_PASSWORD_ROUTE} element={<FrogetPasswordPage />} />
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
