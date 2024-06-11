import { useLocation } from "react-router-dom";

export const ResetPasswordPage = () => {
  const location = useLocation();
  const { email } = location.state;

  return <h1>{email}</h1>;
};
