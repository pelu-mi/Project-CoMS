import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useForgotPasswordMutation } from "services/api/user/useForgotPasswordMutation";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD_ROUTE } from "routes";

const validationSchema = object({
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
});

export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ validationSchema });

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
