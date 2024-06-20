/**
 * Import Modules
 */
import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useCreateCommentMutation } from "services/api/forum/useCreateCommentMutation";

// Validation to use for Forgot Password Form
const validationSchema = object({
  content: string().required("Comment is required"),
});

/**
 * useCommentForm - Custom hook to manage Forgot password form
 */
export const useCommentForm = ({ setComments }) => {
  const { discussionId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ mode: "onSubmit", validationSchema });

  // Handle Success and error
  const { mutateAsync: createComment } = useCreateCommentMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      form.reset();
      setComments((prevComments) => [...prevComments, { ...data.data }]);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ content }) => {
    const payload = {
      content,
      discussion: discussionId,
    };

    await createComment(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
