import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { LOGIN_ROUTE } from "routes";

export const Root = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
    </Routes>
  );
};
