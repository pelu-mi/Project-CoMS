import { ROLES } from "constants/role";
import { useUser } from "context";
import { useForm } from "hooks/useForm";
import { object, string } from "yup";

const validationSchema = object({
  role: string().required(),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const useCreateAccountForm = () => {
  const { createAccount } = useUser();

  const form = useForm({
    validationSchema,
    defaultValues: {
      role: ROLES.student,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formValues) => {
    createAccount(formValues);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
