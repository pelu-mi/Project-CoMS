/**
 * Import Modules
 */
import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useUser } from "context";

// Validation for edit profile form
const validationSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
});

/**
 * useEditProfileForm - Custom hook to manage edit profile form
 */
export const useEditProfileForm = () => {
  const { user } = useUser();
  const form = useForm({
    validationSchema,
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = async (formValues) => {
    // TODO: connect edit profile endpoint
    console.log(formValues);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
