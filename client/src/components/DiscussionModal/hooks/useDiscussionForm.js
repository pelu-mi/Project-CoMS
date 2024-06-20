/**
 * Import Modules
 */
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useCreateDiscussionMutation } from "services/api/forum/useCreateDiscussionMutation";
import { GET_DISCUSSIONS_API_KEY } from "services/constants";

import { object, string } from "yup";

// Validation to use for Creating Disccussions
const validationSchema = object({
  title: string().required("Topic is required"),
});

export const useDiscussionForm = ({ onClose }) => {
  const { courseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm({
    validationSchema,
  });

  // Handle Success and error for Create Disccussions
  const { mutateAsync: createDiscussion } = useCreateDiscussionMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      form.reset();
      await queryClient.invalidateQueries(
        `${GET_DISCUSSIONS_API_KEY}/${courseId}`
      );
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ title }) => {
    const payload = {
      course: courseId,
      title,
    };

    await createDiscussion(payload);
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};
