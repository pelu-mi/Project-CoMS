import { object, string } from "yup";
import { useForm } from "hooks/useForm";

const validationSchema = object({
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
});

export const useForgotPasswordForm = () => {
  const form = useForm({ validationSchema });

  const onSubmit = async (formValues) => {
    console.log("formValues", formValues);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
