/**
 * Import Modules
 */
import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useForgotPasswordMutation } from "services/api/user/useForgotPasswordMutation";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD_ROUTE } from "routes";

// Validation to use for Forgot Password Form
const validationSchema = object({
  email: string()
    .lowercase()
    .email("Email must be a valid email address")
    .required("Email is required"),
});

/**
 * useForgotPasswordForm - Custom hook to manage Forgot password form
 */
export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ validationSchema });

  // Handle Success and error
  const { mutateAsync: requestOTP } = useForgotPasswordMutation({
    onSuccess: async (data, { email }) => {
      enqueueSnackbar(data.message, { variant: "success" });
      navigate(RESET_PASSWORD_ROUTE, { state: { email } });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async (formValues) => {
    await requestOTP(formValues);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
