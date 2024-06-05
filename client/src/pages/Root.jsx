import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { CREATE_ACCOUNT_ROUTE, LOGIN_ROUTE } from "routes";
import { CreateAccountPage } from "./CreateAccountPage";

export const Root = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={CREATE_ACCOUNT_ROUTE} element={<CreateAccountPage />} />
    </Routes>
  );
};
