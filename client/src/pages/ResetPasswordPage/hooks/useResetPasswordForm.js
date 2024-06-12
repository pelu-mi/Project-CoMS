/**
 * Import Modules
 */
import { object, ref, string } from "yup";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useResetPasswordMutation } from "services/api/user/useResetPasswordMutation";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes";

/**
 * Validation for reset password form
 */
const validationSchema = object({
  resetPin: string().required("Reset code is required"),
  newPassword: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
    .required("Confirm password is required")
    .min(8, "Password must be at least 8 characters")
    .oneOf([ref("newPassword"), undefined], "Passwords must match"),
});

/**
 * useResetPasswordForm - Custom hook to manage Reset password form
 *
 * @param {string} email - Email address of user that wants to reset password
 */
export const useResetPasswordForm = (email) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ validationSchema });

  // Handle success and error
  const { mutateAsync: resetPassword } = useResetPasswordMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      navigate(LOGIN_ROUTE);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ resetPin, newPassword }) => {
    const payload = { resetPin, email, newPassword };

    await resetPassword(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
