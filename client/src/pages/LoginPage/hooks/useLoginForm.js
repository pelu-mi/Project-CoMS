import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useUser } from "context";

const validationSchema = object({
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});

export const useLoginForm = () => {
  const { login } = useUser();

  const form = useForm({ validationSchema });

  const onSubmit = async (formValues) => {
    login(formValues, form.setError);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
