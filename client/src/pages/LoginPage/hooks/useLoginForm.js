import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { loginApi } from "services/api/user/loginApi";
import { useUser } from "context";
import cookie from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY } from "constants/auth";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST_ROUTE } from "routes";

const validationSchema = object({
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});

export const useLoginForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const form = useForm({ validationSchema });

  const handleUserResponse = (userResponse) => {
    const { firstName, lastName, email, role, accessToken } = userResponse.data;
    setUser({ firstName, lastName, email, role });
    localStorage.setItem(
      "user",
      JSON.stringify({ firstName, lastName, email, role })
    );

    cookie.set(ACCESS_TOKEN_COOKIE_KEY, accessToken);
    navigate(COURSE_LIST_ROUTE);
  };

  const onSubmit = async (formValues) => {
    try {
      const userResponse = await loginApi(formValues);
      handleUserResponse(userResponse);
    } catch (error) {
      form.setError("email");
      form.setError("password", { message: "Email or password is incorrect!" });
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
