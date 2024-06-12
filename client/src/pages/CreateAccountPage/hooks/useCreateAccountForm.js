import { ROLES } from "constants/role";
import { useUser } from "context";
import { useForm } from "hooks/useForm";
import { object, ref, string } from "yup";

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
  confirmPassword: string()
    .required("Confirm password is required")
    .min(8, "Password must be at least 8 characters")
    .oneOf([ref("password"), undefined], "Passwords must match"),
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
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ role, firstName, lastName, email, password }) => {
    const payload = { role, firstName, lastName, email, password };

    await createAccount(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
