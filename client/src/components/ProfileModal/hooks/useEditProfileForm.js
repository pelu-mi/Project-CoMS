/**
 * Import Modules
 */
import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useUser } from "context";
import { useUpdateUserMutation } from "services/api/user/useUpdateUserMutation";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import {
  GET_COMMENTS_API_KEY,
  GET_DISCUSSIONS_API_KEY,
} from "services/constants";

// Validation for edit profile form
const validationSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
});

/**
 * useEditProfileForm - Custom hook to manage edit profile form
 */
export const useEditProfileForm = ({ onClose }) => {
  const { user, handleSetUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const form = useForm({
    validationSchema,
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const { mutateAsync: updateUser } = useUpdateUserMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      handleSetUser(data);
      onClose();

      await queryClient.invalidateQueries(GET_DISCUSSIONS_API_KEY);
      await queryClient.invalidateQueries(GET_COMMENTS_API_KEY);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ firstName, lastName }) => {
    const payload = { _id: user._id, firstName, lastName };
    await updateUser(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
